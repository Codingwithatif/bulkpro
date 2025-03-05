export interface Product {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  stock: number;
  barcode: string;
  thresholdLimit: number;
  categoryId: string; // The ID of the category this product belongs to
  companyId?: string; // Optional: ID of the company supplying the product
  requestStatus?: 'Pending' | 'Approved' | 'Delivered' | null; // Status of restock request
}
