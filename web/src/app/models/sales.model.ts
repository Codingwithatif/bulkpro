export interface SaleData {
  productId: string;    // ✅ Add this line to fix the issue
  productName: string;  
  quantity: number;     
  totalPrice: number;   
  date: string;         
  month: string;        
}
