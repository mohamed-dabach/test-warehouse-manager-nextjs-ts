import { Product } from "@/types/Product";

export interface FormErrors {
  title?: string;
  price?: string;
  description?: string;
  success?: string;
  error?: string;
}
export const validateForm = ({
  product,
  setFormErrors,
}: {
  product: Product | null;
  setFormErrors: (error: FormErrors) => void;
}): boolean => {
  const errors: FormErrors = {};
  let isValid = true;

  // if (!product) return false;

  // Title validation
  if (!product?.title?.trim()) {
    errors.title = "Title is required";
    isValid = false;
  } else if (product?.title.length < 3) {
    errors.title = "Title must be at least 3 characters long";
    isValid = false;
  }

  // Price validation
  if (!product?.price || product?.price <= 0) {
    errors.price = "Price must be greater than 0";
    isValid = false;
  } else if (product?.price > 100000) {
    errors.price = "Price cannot exceed 100,000";
    isValid = false;
  }

  // Description validation
  // if (!product?.description?.trim()) {
  //   errors.description = "Description is required";
  //   isValid = false;
  // } else if (product?.description.length < 10) {
  //   errors.description = "Description must be at least 10 characters long";
  //   isValid = false;
  // }

  setFormErrors(errors);
  return isValid;
};

interface limitStringProps {
  phrase: string;
  limitCount?: number;
  delimiter?: string;
}
export function limitString({
  phrase,
  limitCount = 20,
  delimiter = "...",
}: limitStringProps) {
  return `${phrase
    ?.split("")
    ?.splice(0, limitCount)
    ?.join("")
    ?.trim()}${delimiter}`;
}
