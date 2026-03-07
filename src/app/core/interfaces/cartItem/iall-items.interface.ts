export interface IAllItems {
  id: string;
  user_id: string;
  total_price: string;
  total_quantity: number;
  created_at: string;
  updated_at: string;
  items: Item[];
}

export interface Item {
  id: string;
  cart_id: string;
  product_id: string;
  product_color_id: string;
  product_type: string;
  quantity: number;
  price: string;
  created_at: string;
  updated_at: string;
  product: Product;
  mobile_color: MobileColor;
  accessory_color: any;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  brand_id: string;
  model_number: string;
  description: string;
  battery: number;
  processor: string;
  storage: string;
  display: string;
  price: string;
  discount: number;
  final_price: number;
  operating_system: string;
  camera: string;
  network_support: string;
  release_year: string;
  image_cover: string;
  status: string;
  product_type: string;
  created_at: string;
  updated_at: string;
}

export interface MobileColor {
  id: string;
  mobile_id: string;
  color_id: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}
