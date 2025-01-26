import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; // Import the DB connection utility
import Product from '@/models/Product'; // Import your Mongoose model
import { NextApiRequest, NextApiResponse } from "next";



// API Route Handler for GET requests to /api/products
export async function GET() {
    await dbConnect(); // Ensure the DB connection is established

    try {
        const products = await Product.find(); // Fetch all products from the database

        let tshirts = {};

        // Iterate through each product to organize variants
        for (let item of products) {
            if (item.name in tshirts) {
                if (
                    !tshirts[item.name].color.includes(item.color) &&
                    item.stock > 0
                ) {
                    tshirts[item.name].color.push(item.color); // Add color if not already present
                }
                if (
                    !tshirts[item.name].size.includes(item.size) &&
                    item.stock > 0
                ) {
                    tshirts[item.name].size.push(item.size); // Add size if not already present
                }
            } else {
                tshirts[item.name] = JSON.parse(JSON.stringify(item)); // Deep clone the item
                if (item.stock > 0) {
                    tshirts[item.name].color = [item.color]; // Initialize colors array
                    tshirts[item.name].size = [item.size]; // Initialize sizes array
                }
            }
        }


        return NextResponse.json(tshirts);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}


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


export async function PUT(req: Request) {
    try {
        // Ensure database connection
        await dbConnect();

        // Parse the JSON body from the request
        const updates = await req.json();

        // Validate the updates array
        if (!Array.isArray(updates) || updates.length === 0) {
            return NextResponse.json(
                { message: "Invalid or empty updates array." },
                { status: 400 }
            );
        }

        // Create bulk operations for MongoDB
        const bulkOperations = updates.map((update: { slug: string; data: any }) => ({
            updateOne: {
                filter: { slug: update.slug }, // Match the product by slug
                update: { $set: update.data }, // Update the specified fields
            },
        }));

        // Perform bulk write operation
        const result = await Product.bulkWrite(bulkOperations);

        // Return success response
        return NextResponse.json(
            {
                message: "Products updated successfully.",
                modifiedCount: result.modifiedCount,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating products:", error);

        // Return internal server error response
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}
