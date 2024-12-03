"use server";

import { supabase } from './client';
import { Database } from './types';

type GroceryItem = Database['public']['Tables']['grocery_items']['Insert'];
type Category = Database['public']['Tables']['categories']['Row'];

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

export async function getGroceryItems(): Promise<GroceryItem[]> {
  const { data, error } = await supabase
    .from('grocery_items')
    .select('*')
    .order('created_at');

  if (error) throw error;
  return data;
}

export async function addGroceryItem(item: Omit<GroceryItem, 'id' | 'created_at' | 'updated_at'>) {
  const { error } = await supabase
    .from('grocery_items')
    .insert(item);

  if (error) throw error;
}

export async function updateGroceryItem(id: string, updates: Partial<GroceryItem>) {
  const { error } = await supabase
    .from('grocery_items')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteGroceryItem(id: string) {
  const { error } = await supabase
    .from('grocery_items')
    .delete()
    .eq('id', id);

  if (error) throw error;
}