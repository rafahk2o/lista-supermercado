export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  completed: boolean;
  note?: string;
  price?: number;
  unit?: string;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export type FilterType = "all" | "active" | "completed" | string;