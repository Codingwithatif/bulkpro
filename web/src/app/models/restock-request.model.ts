export interface RestockRequest {
    id?: string; // Auto-generated in Firebase
    productId: string;
    productName: string;
    quantityRequested: number;
    status: 'Pending' | 'Approved' | 'Delivered' | 'Rejected'; // Added 'Rejected' status
    timestamp: number;
    martId: string;
    companyId: string;
    requestedBy?: string; // User ID of the person who requested restock
    approvedBy?: string; // User ID of the company representative who approved it
    deliveredBy?: string; // User ID of the delivery person
  }
  