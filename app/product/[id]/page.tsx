import Pen from "../../../public/img/icons/pen.svg";
import Link from "next/link";
import { Product } from "@/types/Product";
import axiosInstance from "@/lib/axios/axiosInstance";
import Error404 from "@/components/Error404";
import DeleteProductBtn from "@/components/DeleteProductBtn";

interface ViewProductProps {
  params: {
    id: string;
  };
}

const ViewProduct = async ({ params: { id } }: ViewProductProps) => {
  // fetch the the product by id
  const product: Product | null = await axiosInstance
    .get<Product | null>("/products/" + id)
    .then((res) => res.data)
    .catch((err) => {
      console.log("Error couldn't fetch this product: ", err);
      return null;
    });

  if (!product) return <Error404 />;
  return (
    <div className="w-full">
      <div className="container max-w-2xl m-auto">
        <div className="flex  justify-end w-full gap-4 mb-3">
          <Link
            href={`/product/${id}/edit`}
            className="px-3 py-2 border-2 text-green-600 rounded-lg flex gap-2 justify-center items-center"
          >
            Edit
            <Pen />
          </Link>
          {/* button with delete product  logic */}
          <DeleteProductBtn cssClass={"px-3 py-2 border"} id={id}>
            Delete
          </DeleteProductBtn>
        </div>
        <div>
          <h2 className="text-2xl text-bold">Title: {product?.title}</h2>
          <p className="my-2">
            <strong>Description:</strong> {product?.description}
          </p>
          <p className="my-2">
            <strong>Category:</strong> {product?.category}
          </p>
          <p className="my-2">
            <strong>Price:</strong> {product?.price}$
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
