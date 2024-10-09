import { Product } from "@/types/Product";
import { proxy } from "valtio";

export interface BasketProduct extends Product {
  quantity: number;
}
export interface Store {
  basket: BasketProduct[];
  shippingPrice: number;
}

const store = proxy<Store>({
  basket: [],
  shippingPrice: 5,
});

export default store;
