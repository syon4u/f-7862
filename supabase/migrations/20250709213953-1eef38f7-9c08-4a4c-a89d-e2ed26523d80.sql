-- First, let's check and populate the products table with the current mock data
-- and add necessary fields for e-commerce functionality

-- Add any missing fields to products table for e-commerce
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS inventory_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS weight_kg DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS dimensions_cm VARCHAR(50);

-- Create shopping cart tables
CREATE TABLE IF NOT EXISTS shopping_carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT, -- For guest users
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES shopping_carts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    selected_size TEXT,
    selected_color TEXT,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(cart_id, product_id, selected_size, selected_color)
);

-- Enable RLS
ALTER TABLE shopping_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for shopping_carts
CREATE POLICY "Users can view their own carts" ON shopping_carts
    FOR SELECT USING (user_id = auth.uid() OR session_id IS NOT NULL);

CREATE POLICY "Users can create their own carts" ON shopping_carts
    FOR INSERT WITH CHECK (user_id = auth.uid() OR session_id IS NOT NULL);

CREATE POLICY "Users can update their own carts" ON shopping_carts
    FOR UPDATE USING (user_id = auth.uid() OR session_id IS NOT NULL);

CREATE POLICY "Users can delete their own carts" ON shopping_carts
    FOR DELETE USING (user_id = auth.uid() OR session_id IS NOT NULL);

-- RLS Policies for cart_items
CREATE POLICY "Users can view their own cart items" ON cart_items
    FOR SELECT USING (
        cart_id IN (
            SELECT id FROM shopping_carts 
            WHERE user_id = auth.uid() OR session_id IS NOT NULL
        )
    );

CREATE POLICY "Users can create their own cart items" ON cart_items
    FOR INSERT WITH CHECK (
        cart_id IN (
            SELECT id FROM shopping_carts 
            WHERE user_id = auth.uid() OR session_id IS NOT NULL
        )
    );

CREATE POLICY "Users can update their own cart items" ON cart_items
    FOR UPDATE USING (
        cart_id IN (
            SELECT id FROM shopping_carts 
            WHERE user_id = auth.uid() OR session_id IS NOT NULL
        )
    );

CREATE POLICY "Users can delete their own cart items" ON cart_items
    FOR DELETE USING (
        cart_id IN (
            SELECT id FROM shopping_carts 
            WHERE user_id = auth.uid() OR session_id IS NOT NULL
        )
    );

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_shopping_carts_updated_at BEFORE UPDATE ON shopping_carts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();