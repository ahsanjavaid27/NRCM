import { useParams } from 'react-router-dom';
import ServiceDetailPage from '../../components/pages/ServiceDetailPage';

export default function ServiceDetailRoute() {
  const { slug = '' } = useParams();
  return <ServiceDetailPage slug={slug} />;
}
