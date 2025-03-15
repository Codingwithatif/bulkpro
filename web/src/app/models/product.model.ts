export interface Product {
  id?: number; // Optional (auto-generated)
  name: string;
  description?: string;
  price: number;
  quantity: number;
  thresholdLimit: number;
  
  categoryId: string; // Links product to a category
}
