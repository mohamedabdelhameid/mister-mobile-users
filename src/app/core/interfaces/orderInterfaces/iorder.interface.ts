export interface IOrder {
  id: string;
  payment_method: string;
  payment_status: string;
  payment_proof: any;
  total_price: number;
  note: string;
  user: User;
  created_at: string;
  updated_at: string;
  items: Item[];
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  city: string;
  area: string;
}

export interface Item {
  id: string;
  product_type: string;
  quantity: number;
  price: number;
  total_price: number;
  created_at: string;
  updated_at: string;
  product: Product;
  color: Color;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_cover: string;
  model_number: string;
  battery: number;
  processor: string;
  storage: string;
  display: string;
  operating_system: string;
  camera: string;
  network_support: string;
  total_quantity: string;
  price: string;
  discount: number;
  final_price: number;
  release_year: string;
  status: string;
  product_type: string;
}

export interface Color {
  id: string;
  name: string;
  hex_code: string;
}

export interface Slot {
  number: number;
  completed: boolean;
  isReward: boolean;
  icon: string;
  label: string;
}
