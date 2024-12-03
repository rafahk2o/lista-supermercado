import { Category } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Frutas e Vegetais', icon: 'apple', color: 'emerald' },
  { id: '2', name: 'Laticínios e Ovos', icon: 'milk', color: 'blue' },
  { id: '3', name: 'Carnes e Peixes', icon: 'beef', color: 'red' },
  { id: '4', name: 'Mercearia', icon: 'cookie', color: 'amber' },
  { id: '5', name: 'Bebidas', icon: 'coffee', color: 'purple' },
  { id: '6', name: 'Casa e Limpeza', icon: 'spray', color: 'cyan' },
];

export const units = [
  { value: 'un', label: 'Unidade(s)' },
  { value: 'kg', label: 'Quilograma(s)' },
  { value: 'g', label: 'Grama(s)' },
  { value: 'l', label: 'Litro(s)' },
  { value: 'ml', label: 'Mililitro(s)' },
  { value: 'cx', label: 'Caixa(s)' },
  { value: 'pct', label: 'Pacote(s)' },
];