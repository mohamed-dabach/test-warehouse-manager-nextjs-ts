import Pen from "../../../public/img/icons/pen.svg";
import Link from "next/link";
import { Product } from "@/types/Product";
import axiosInstance from "@/lib/axios/axiosInstance";
import Error404 from "@/components/Error404";
import DeleteProductBtn from "@/components/products/DeleteProductBtn";
import Image from "next/image";
import EditProductBtn from "@/components/products/EditProductBtn";

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
      <div className="container max-w-2xl m-auto p-2">
        <div className="flex  justify-end w-full gap-4 mb-3">
          <EditProductBtn id={product.id} cssClass={"px-3 py-2 border"}>
            Edit
          </EditProductBtn>

          {/* button with delete product  logic */}
          <DeleteProductBtn cssClass={"px-3 py-2 border"} id={id}>
            Delete
          </DeleteProductBtn>
        </div>
        <div className="md:flex gap-2 justify-center items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={150}
            height={150}
          />
          <div>
            <h3 className="text-2xl font-bold mt-2">
              {product?.title}({product?.category})
            </h3>
            <p className="my-2">{product?.description}</p>
            <p className="my-2 font-bold">{product?.price}$</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
