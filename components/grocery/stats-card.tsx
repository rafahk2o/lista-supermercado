"use client";

import { Card } from "@/components/ui/card";
import { GroceryItem } from "@/lib/types";
import { CheckCircle2, CircleDollarSign, ShoppingCart } from "lucide-react";

interface StatsCardProps {
  items: GroceryItem[];
}

export function StatsCard({ items }: StatsCardProps) {
  const totalItems = items.length;
  const completedItems = items.filter(item => item.completed).length;
  const totalPrice = items.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 border-none">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total de Itens</p>
            <p className="text-2xl font-bold">{totalItems}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 border-none">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Itens Comprados</p>
            <p className="text-2xl font-bold">{completedItems}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 border-none">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <CircleDollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Estimado</p>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalPrice)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}