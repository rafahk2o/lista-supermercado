"use client";

import { useEffect, useState } from "react";
import { AddItemDialog } from "@/components/grocery/add-item-dialog";
import { GroceryList } from "@/components/grocery/grocery-list";
import { StatsCard } from "@/components/grocery/stats-card";
import { ShoppingCart } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/types";

type GroceryItem = Database['public']['Tables']['grocery_items']['Row'];

export default function Home() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('grocery_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'grocery_items' }, 
        () => {
          fetchItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('grocery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (newItem: Omit<GroceryItem, "id" | "completed" | "created_at" | "updated_at">) => {
    try {
      const { error } = await supabase
        .from('grocery_items')
        .insert({
          ...newItem,
          completed: false,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const toggleItem = async (id: string) => {
    try {
      const item = items.find(i => i.id === id);
      if (!item) return;

      const { error } = await supabase
        .from('grocery_items')
        .update({ completed: !item.completed })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error toggling item:', error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('grocery_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-3 bg-blue-500/10 rounded-2xl">
            <ShoppingCart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
            Lista de Compras
          </h1>
        </div>

        <StatsCard items={items} />

        <div className="mb-8">
          <AddItemDialog onAddItem={addItem} />
        </div>

        <GroceryList
          items={items}
          onToggleItem={toggleItem}
          onDeleteItem={deleteItem}
        />

        {items.length === 0 && (
          <div className="text-center text-muted-foreground mt-12 bg-white/50 dark:bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm border border-white/20">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-blue-500/50" />
            <p className="text-lg">
              Sua lista de compras está vazia. Adicione alguns itens para começar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}