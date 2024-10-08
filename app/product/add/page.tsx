"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useRouter } from "next/navigation";
import { FormErrors, validateForm } from "@/lib/helpers/product";
import { Product } from "@/types/Product";

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export default function AddProduct() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors | null>(null);
  const Router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // input validation
    if (!validateForm({ product, setFormErrors })) {
      return;
    }

    try {
      setLoading(true);
      // console.log("loading...");
      await axiosInstance
        .post(`/products/`, product)
        .then((res) => res.data)
        .finally(() => setLoading(false));
      setFormErrors({ success: "Added Successfuly" });
      setTimeout(() => Router.push("/"), 1000);
    } catch (err) {
      console.error(err);
      setFormErrors({ error: "There was an error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <p className="text-green-400">{formErrors?.success ?? ""}</p>
      <p className="text-red-400">{formErrors?.error ?? ""}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={product?.title || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProduct(
                (prev) =>
                  ({
                    ...prev,
                    title: e.target.value,
                  } as Product)
              )
            }
            className={`mt-1 block w-full rounded-md border px-3 py-2 
              ${formErrors?.title ? "border-red-500" : "border-gray-300"}`}
            minLength={3}
          />
          {formErrors?.title && (
            <p className="mt-1 text-sm text-red-500">{formErrors?.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product?.price || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProduct(
                (prev) =>
                  ({
                    ...prev,
                    price: parseFloat(e.target.value),
                  } as Product)
              )
            }
            max="100000"
            className={`mt-1 block w-full rounded-md border px-3 py-2 
              ${formErrors?.price ? "border-red-500" : "border-gray-300"}`}
          />
          {formErrors?.price && (
            <p className="mt-1 text-sm text-red-500">{formErrors?.price}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={product?.category || ""}
            onChange={(e) =>
              setProduct(
                (prev) =>
                  ({
                    ...prev,
                    category: e.target.value,
                  } as Product)
              )
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description (optionnal)
          </label>
          <textarea
            id="description"
            name="description"
            value={product?.description || ""}
            onChange={(e) =>
              setProduct(
                (prev) =>
                  ({
                    ...prev,
                    description: e.target.value,
                  } as Product)
              )
            }
            rows={4}
            className={`mt-1 block w-full rounded-md border px-3 py-2 
              ${
                formErrors?.description ? "border-red-500" : "border-gray-300"
              }`}
          />
          {formErrors?.description && (
            <p className="mt-1 text-sm text-red-500">
              {formErrors?.description}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => Router.back()}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
