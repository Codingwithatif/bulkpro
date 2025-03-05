export interface Category {
  id?: string;              // Firestore auto-generated ID
  name: string;             // Category name
  description?: string;     // Optional description for the category
  productIds?: string[];    // Array of associated product IDs
  userRole?: string;        // Optional: "mart" or "company"
  createdBy?: string;       // UID of creator
  createdAt?: string;       // Timestamp of creation
}
