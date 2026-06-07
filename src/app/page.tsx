import { OrientationFunnel } from '@/components/funnel/OrientationFunnel';

export default function HomePage() {
  return (
    <OrientationFunnel
      calLink={process.env.NEXT_PUBLIC_CAL_COM_LINK}
      calNamespace={process.env.NEXT_PUBLIC_CAL_COM_NAMESPACE}
    />
  );
}
