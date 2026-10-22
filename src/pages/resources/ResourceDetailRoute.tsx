import { useParams, Link } from 'react-router-dom';
import ArticlePage from '../../components/pages/ArticlePage';
import { ARTICLES } from '../../data/articles';
import Button from '../../components/ui/Button';

export default function ResourceDetailRoute() {
  const { slug = '' } = useParams();
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div className="page">
        <h1 className="h1">Resource not found</h1>
        <p className="lead">
          The educational resource you are looking for does not exist or has moved.
        </p>
        <div className="not-found__actions">
          <Link to="/resources">
            <Button variant="primary">Back to Resources</Button>
          </Link>
          <Link to="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return <ArticlePage article={article} crumbLabel={article.title} />;
}
