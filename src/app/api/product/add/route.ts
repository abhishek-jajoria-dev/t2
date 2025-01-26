import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; // Import DB connection utility
import Product from '@/models/Product'; // Import the Product Mongoose model

// API Route Handler for POST request to /api/products (Bulk Product Creation)
export async function POST(req: Request) {
    await dbConnect(); // Ensure DB connection

    try {
        // Parse the incoming JSON body of the request
        const products = await req.json();

        // Validation: Ensure we have an array of products
        if (!Array.isArray(products)) {
            return NextResponse.json({ error: 'Invalid input format. Expected an array of products.' }, { status: 400 });
        }

        // Validate each product (optional: you can add more validations as needed)
        for (const product of products) {
            const { name, slug, price, color, size, stock } = product;

            if (!name || !slug || !price || !color || !size || stock === undefined) {
                return NextResponse.json({ error: 'Missing required fields in one or more products.' }, { status: 400 });
            }
        }

        // Bulk insert products into the database
        const savedProducts = await Product.insertMany(products); // Mongoose's insertMany() allows bulk insert

        // Return the saved products with success status
        return NextResponse.json(savedProducts, { status: 201 });
    } catch (error) {
        console.error('Error creating products:', error);
        return NextResponse.json({ error: 'Error creating products' }, { status: 500 });
    }
}
