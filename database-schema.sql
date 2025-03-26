-- Products table to store cosmetic product information
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand TEXT,
  product_type TEXT NOT NULL,
  ingredients TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on product name for faster searches
CREATE INDEX idx_products_name ON products USING gin (name gin_trgm_ops);

-- Comparisons table to store product comparison results
CREATE TABLE comparisons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  original_product TEXT NOT NULL,
  alternative_product TEXT NOT NULL,
  product_type TEXT NOT NULL,
  results JSONB NOT NULL,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recommendations table to store AI product recommendations
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  current_product TEXT NOT NULL,
  product_type TEXT NOT NULL,
  concerns TEXT[] NOT NULL,
  preferences TEXT,
  budget TEXT NOT NULL,
  recommendations JSONB NOT NULL,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Safety scores table to store product safety analysis
CREATE TABLE safety_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_name TEXT NOT NULL,
  product_type TEXT NOT NULL,
  ingredients TEXT,
  analysis JSONB NOT NULL,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (if you're not using Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_scores ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can view their own comparisons" 
  ON comparisons FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own comparisons" 
  ON comparisons FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own recommendations" 
  ON recommendations FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own recommendations" 
  ON recommendations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own safety scores" 
  ON safety_scores FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own safety scores" 
  ON safety_scores FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy for public access to products
CREATE POLICY "Anyone can view products" 
  ON products FOR SELECT 
  USING (true);

