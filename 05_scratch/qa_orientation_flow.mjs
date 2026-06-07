import fs from 'node:fs/promises';

const APP_URL = process.argv[2] || 'http://127.0.0.1:4100'
const DEBUG_URL = process.argv[3] || 'http://127.0.0.1:9222'
const OUTPUT_DIR = '/tmp/reboot-orientation-qa';

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getPageDebuggerUrl() {
  const response = await fetch(`${DEBUG_URL}/json/list`);
  const pages = await response.json();
  const page = pages.find((item) => item.type === 'page' && item.url.startsWith(APP_URL)) || pages.find((item) => item.type === 'page');

  if (!page?.webSocketDebuggerUrl) {
    throw new Error('No se encontró una página de Chromium para depurar.');
  }

  return page.webSocketDebuggerUrl;
}

async function createClient() {
  const wsUrl = await getPageDebuggerUrl();
  const socket = new WebSocket(wsUrl);
  const pending = new Map();
  let messageId = 0;

  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  socket.addEventListener('message', (event) => {
    const payload = JSON.parse(event.data);

    if (!payload.id) {
      return;
    }

    const entry = pending.get(payload.id);

    if (!entry) {
      return;
    }

    pending.delete(payload.id);

    if (payload.error) {
      entry.reject(new Error(payload.error.message || 'CDP error'));
      return;
    }

    entry.resolve(payload.result);
  });

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++messageId;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }

  async function evaluate(expression) {
    const result = await send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true
    });

    return result.result?.value;
  }

  return {
    close: () => socket.close(),
    evaluate,
    send
  };
}

function js(value) {
  return JSON.stringify(value);
}

async function captureScreenshot(client, filename) {
  const { data } = await client.send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true
  });

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(`${OUTPUT_DIR}/${filename}`, Buffer.from(data, 'base64'));
}

async function clickButtonContaining(client, text) {
  const ok = await client.evaluate(`(() => {
    const normalize = (value) => value.replace(/\s+/g, ' ').trim();
    const target = ${js(text)};
    const button = [...document.querySelectorAll('button')].find((node) => normalize(node.textContent || '').includes(target));
    if (!button) return false;
    button.click();
    return true;
  })()`);

  if (!ok) {
    const buttons = await client.evaluate(`(() => [...document.querySelectorAll('button')].map((node) => node.textContent?.replace(/\s+/g, ' ').trim()).filter(Boolean))()`);
    throw new Error(`No se encontró botón con texto: ${text}. Botones visibles: ${buttons.join(' | ')}`);
  }
}

async function setFieldValue(client, selector, value) {
  const ok = await client.evaluate(`(() => {
    const element = document.querySelector(${js(selector)});
    if (!element) return false;
    const setter = Object.getOwnPropertyDescriptor(element.constructor.prototype, 'value')?.set;
    if (!setter) return false;
    setter.call(element, ${js(value)});
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  })()`);

  if (!ok) {
    throw new Error(`No se pudo rellenar el selector: ${selector}`);
  }
}

async function chooseOption(client, label) {
  const ok = await client.evaluate(`(() => {
    const normalize = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim();
    const target = normalize(${js(label)});
    const button = [...document.querySelectorAll('main button')].find((node) => normalize(node.textContent || '').includes(target));
    if (!button) return false;
    button.click();
    return true;
  })()`);

  if (!ok) {
    const choices = await client.evaluate(`(() => [...document.querySelectorAll('main button')].map((node) => node.textContent?.replace(/\s+/g, ' ').trim()).filter(Boolean))()`);
    throw new Error(`No se encontró la opción: ${label}. Opciones visibles: ${choices.join(' | ')}`);
  }
}

async function completeStep(client, step) {
  const question = await client.evaluate(`document.querySelector('main h2')?.textContent?.trim() || ''`);

  if (!question) {
    throw new Error('No se pudo leer la pregunta activa.');
  }

  console.log(`STEP: ${question}`);

  if (step.input === 'text') {
    await setFieldValue(client, step.selector, step.value);
    await clickButtonContaining(client, step.submitText || 'Continuar');
    return question;
  }

  if (step.input === 'textarea') {
    await setFieldValue(client, step.selector, step.value);
    await clickButtonContaining(client, step.submitText || 'Continuar');
    return question;
  }

  if (step.input === 'choice') {
    await chooseOption(client, step.value);
    return question;
  }

  if (step.input === 'consent') {
    const ok = await client.evaluate(`(() => {
      const label = document.querySelector('label');
      if (!label) return false;
      label.click();
      return true;
    })()`);

    if (!ok) {
      throw new Error('No se pudo marcar el consentimiento.');
    }

    const submitOk = await client.evaluate(`(() => {
      const button = [...document.querySelectorAll('button')].find((node) => !(node.textContent || '').includes('Atrá'));
      if (!button) return false;
      button.click();
      return true;
    })()`);

    if (!submitOk) {
      throw new Error('No se pudo pulsar el CTA final.');
    }

    return question;
  }

  throw new Error(`Tipo de paso no soportado: ${step.input}`);
}

async function main() {
  const client = await createClient();
  const steps = [
    { input: 'text', selector: 'input[type="text"]', value: 'Raul', submitText: 'Continuar' },
    { input: 'text', selector: 'input[type="text"]', value: 'Martínez Díaz', submitText: 'Continuar' },
    { input: 'choice', value: '25 - 34' },
    { input: 'text', selector: 'input[type="text"]', value: 'Las Palmas, España', submitText: 'Continuar' },
    { input: 'text', selector: 'input[type="email"]', value: 'qa+reboot@example.com', submitText: 'Continuar' },
    { input: 'text', selector: 'input[type="tel"]', value: '+34600000000', submitText: 'Continuar' },
    { input: 'choice', value: 'trabajando' },
    { input: 'choice', value: 'carrera o de sector' },
    { input: 'choice', value: 'carrera hacia tecnología' },
    { input: 'choice', value: 'full stack' },
    { input: 'choice', value: 'He hecho algún curso o tutorial' },
    { input: 'choice', value: 'Universidad' },
    { input: 'choice', value: '10 - 20 horas por semana' },
    { input: 'choice', value: 'mentorías 1:1' },
    { input: 'choice', value: 'Entre 1.000 € y 2.000 €' },
    { input: 'choice', value: 'pago fraccionado' },
    { input: 'choice', value: 'Este mes' },
    {
      input: 'textarea',
      selector: 'textarea',
      value: 'Busco un cambio profesional ordenado, con acompañamiento y una ruta realista para empezar pronto.',
      submitText: 'Continuar'
    },
    { input: 'consent', submitText: 'Enviar y reservar' }
  ];

  const questions = [];

  try {
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await client.send('Page.navigate', { url: APP_URL });
    await wait(2000);
    await client.evaluate(`(() => {
      window.localStorage.removeItem('reboot_orientation_funnel_v1');
      window.location.reload();
      return true;
    })()`);
    await wait(2000);

    await captureScreenshot(client, 'landing-mobile.png');
    await clickButtonContaining(client, 'Empezar');
    await wait(1200);

    for (const step of steps) {
      questions.push(await completeStep(client, step));
      await wait(700);
    }

    await wait(2500);
    await captureScreenshot(client, 'completion-mobile.png');

    const result = await client.evaluate(`(() => ({
      heading: document.querySelector('h1')?.textContent?.trim() || '',
      banner: [...document.querySelectorAll('p')].map((node) => node.textContent?.trim()).find((text) => text?.includes('guardar tus respuestas') || text?.includes('guardadas') || text?.includes('No hemos podido guardar')) || '',
      hasIframe: Boolean(document.querySelector('iframe')),
      hasPlaceholder: document.body.textContent?.includes('La agenda de Cal.com se mostrará aquí') || false
    }))()`);

    const report = {
      appUrl: APP_URL,
      checkedAt: new Date().toISOString(),
      completion: result,
      questions
    };

    await fs.writeFile(`${OUTPUT_DIR}/result.json`, `${JSON.stringify(report, null, 2)}\n`);
    console.log(JSON.stringify(report, null, 2));
  } finally {
    client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
