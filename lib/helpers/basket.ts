import store, { BasketProduct } from "@/store";
import { Product } from "@/types/Product";
import toast from "react-hot-toast";

export function handleAddToBasket({ product }: { product: Product }): void {
  store.basket = [{ ...product, quantity: 1 }, ...store.basket];
  window.localStorage.setItem("basket", JSON.stringify(store));
  toast.success("Added To Basket successfuly", { duration: 1000 });
}

export function handleRemoveFromBasket({ product }: { product: Product }) {
  store.basket = store.basket.filter((prod) => {
    return prod.id !== product.id;
  });
  window.localStorage.setItem("basket", JSON.stringify(store));
  toast.success("Removed From Basket successfuly", { duration: 1000 });
}

export function handleIncrementBasket({ product }: { product: BasketProduct }) {
  store.basket = store.basket.map((prod) => {
    if (product.id !== prod.id) return prod;
    return { ...prod, quantity: prod.quantity + 1 };
  });
  window.localStorage.setItem("basket", JSON.stringify(store));
}
export function handleDecrementBasket({ product }: { product: BasketProduct }) {
  store.basket = store.basket.map((prod) => {
    if (product.id !== prod.id) return prod;
    return {
      ...prod,
      quantity: prod.quantity > 1 ? prod.quantity - 1 : prod.quantity,
    };
  });
  window.localStorage.setItem("basket", JSON.stringify(store));
}
