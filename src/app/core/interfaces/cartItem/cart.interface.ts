export interface Cart {
  id: string;
  user_id: string;
  total_price: number;
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
}

export interface mobileData {
  product_id: string | null;
  product_type: string | null;
  product_color_id: string | undefined;
  quantity: number | null;
}

export interface SuccessOrderData {
  order_id: string;
  whatsapp_url: string;
}
