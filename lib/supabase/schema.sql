-- Drop existing tables if they exist
drop table if exists public.grocery_items;
drop table if exists public.categories;

-- Create categories table
create table public.categories (
    id uuid not null default gen_random_uuid() primary key,
    name text not null,
    icon text not null,
    color text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create grocery_items table
create table public.grocery_items (
    id uuid not null default gen_random_uuid() primary key,
    name text not null,
    quantity integer not null default 1,
    category_id uuid references public.categories(id) on delete cascade,
    completed boolean not null default false,
    note text,
    price decimal(10,2),
    unit text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index grocery_items_category_id_idx on public.grocery_items(category_id);
create index grocery_items_completed_idx on public.grocery_items(completed);

-- Enable RLS
alter table public.categories enable row level security;
alter table public.grocery_items enable row level security;

-- Create RLS policies
create policy "Enable read access for all users" on public.categories
    for select using (true);

create policy "Enable read access for all users" on public.grocery_items
    for select using (true);

create policy "Enable insert access for all users" on public.grocery_items
    for insert with check (true);

create policy "Enable update access for all users" on public.grocery_items
    for update using (true);

create policy "Enable delete access for all users" on public.grocery_items
    for delete using (true);

-- Insert default categories
insert into public.categories (name, icon, color) values
    ('Frutas e Vegetais', 'apple', 'emerald'),
    ('Laticínios e Ovos', 'milk', 'blue'),
    ('Carnes e Peixes', 'beef', 'red'),
    ('Mercearia', 'cookie', 'amber'),
    ('Bebidas', 'coffee', 'purple'),
    ('Casa e Limpeza', 'spray', 'cyan');