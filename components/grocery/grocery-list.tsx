"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CategoryIcon } from "./category-icon";
import { cn } from "@/lib/utils";
import { Database } from "@/lib/supabase/types";
import { supabase } from "@/lib/supabase/client";

type GroceryItem = Database['public']['Tables']['grocery_items']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];

interface GroceryListProps {
  items: GroceryItem[];
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export function GroceryList({ items, onToggleItem, onDeleteItem }: GroceryListProps) {
  const [filter, setFilter] = useState<string>("all");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return item.category_id === filter;
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = categories.find((c) => c.id === item.category_id);
    const categoryName = category?.name || "Outros";
    if (!acc[categoryName]) {
      acc[categoryName] = { items: [], category };
    }
    acc[categoryName].items.push(item);
    return acc;
  }, {} as Record<string, { items: GroceryItem[], category?: Category }>);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {["all", "active", "completed", ...categories.map(c => c.id)].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full whitespace-nowrap",
              filter === f && "bg-gradient-to-r from-blue-500 to-blue-600"
            )}
          >
            {f === "all" ? "Todos os Itens" : 
             f === "active" ? "Ativos" :
             f === "completed" ? "Concluídos" :
             categories.find(c => c.id === f)?.name}
          </Button>
        ))}
      </div>

      {Object.entries(groupedItems).map(([categoryName, { items: categoryItems, category }]) => (
        <Card key={categoryName} className={cn(
          "p-4 border-l-4",
          category && `border-l-${category.color}-500`
        )}>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            {category && <CategoryIcon name={category.icon} className="h-5 w-5" />}
            {categoryName}
            <span className="text-sm font-normal text-muted-foreground">
              ({categoryItems.length} {categoryItems.length === 1 ? 'item' : 'itens'})
            </span>
          </h3>
          <div className="space-y-2">
            {categoryItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={item.completed}
                    onCheckedChange={() => onToggleItem(item.id)}
                    className="h-5 w-5"
                  />
                  <div className="flex flex-col">
                    <span className={cn(
                      "font-medium",
                      item.completed && "line-through text-muted-foreground"
                    )}>
                      {item.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.quantity} {item.unit}
                      {item.price && ` • R$ ${item.price.toFixed(2)}`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.note && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-blue-500"
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.note}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteItem(item.id)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}