import axiosInstance from "@/lib/axios/axiosInstance";
import ProductCategoryItem from "./ProductCategoryItem";

const getCategorys = async () => {
  const categories: string[] | null = await axiosInstance
    .get<string[]>("/products/categories")
    .then((res) => res.data)
    .catch((err) => {
      console.log("There was an Error: " + err);
      return null;
    });
  return categories;
};

export default async function ProductCategoryList() {
  const categories = await getCategorys();

  return (
    <div className="w-full">
      <div className="container max-w-2xl m-auto">
        <div className="flex items-start flex-col">
          {" "}
          <h2 className="text-2xl font-bold tracking-tight text-gray-600">
            Categories
          </h2>
          <div className="flex justify-center gap-3 my-2 flex-wrap">
            {categories && ["Allsss", ...categories]?.length > 0
              ? categories?.map((item) => (
                  <ProductCategoryItem item={item} key={item} />
                ))
              : "no category found!"}
          </div>
        </div>
      </div>
    </div>
  );
}
