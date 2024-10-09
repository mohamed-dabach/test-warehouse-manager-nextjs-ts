// app/page.tsx
import ProductCategoryList from "@/components/products/category/ProductCategoryList";
import SearchProductInput from "@/components/products/SearchProductInput";
import DynamicProductList from "@/components/products/DaynamicProductList";

type Props = {
  searchParams: { name?: string; category?: string };
};

export default function Home({ searchParams }: Props) {
  return (
    <>
      <SearchProductInput defaultValue={searchParams.name || ""} />
      <ProductCategoryList />
      <DynamicProductList />
    </>
  );
}
