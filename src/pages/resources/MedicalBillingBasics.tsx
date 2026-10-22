import ArticlePage from "../../components/pages/ArticlePage";
import { ARTICLES } from "../../data/articles";

export default function MedicalBillingBasics() {
  return <ArticlePage article={ARTICLES["medical-billing-basics"]} crumbLabel="Medical Billing Basics" />;
}
