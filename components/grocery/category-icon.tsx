import { Apple, Beef, Coffee, Cookie, Milk, Spray } from "lucide-react";

const iconMap = {
  apple: Apple,
  beef: Beef,
  coffee: Coffee,
  cookie: Cookie,
  milk: Milk,
  spray: Spray,
};

interface CategoryIconProps {
  name: string;
  className?: string;
}

export function CategoryIcon({ name, className }: CategoryIconProps) {
  const Icon = iconMap[name as keyof typeof iconMap];
  return Icon ? <Icon className={className} /> : null;
}