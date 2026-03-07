import { Ibrand } from '../brandInterface/ibrand.interface';

export interface Iproduct {
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
  total_quantity: number;
  brand: Ibrand;
  price: string;
  discount: number;
  final_price: number;
  release_year: string;
  status: string;
  product_type: string;
  colors: IColorItem[];
}

export interface IColorItem {
  id: string;
  stock_quantity: number;
  is_available: boolean;
  color: {
    id: string;
    name: string;
    hex_code: string;
  };
  images: { id: string; image: string }[];
}
