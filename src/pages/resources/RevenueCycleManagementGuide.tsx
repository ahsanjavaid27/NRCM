import ArticlePage from "../../components/pages/ArticlePage";
import { ARTICLES } from "../../data/articles";

export default function RevenueCycleManagementGuide() {
  return <ArticlePage article={ARTICLES["revenue-cycle-management"]} crumbLabel="Revenue Cycle Management" />;
}
