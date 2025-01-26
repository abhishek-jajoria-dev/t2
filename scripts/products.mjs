import fetch from 'node-fetch'; // Import node-fetch to make HTTP requests
// const fetch = require('node-fetch'); // Use require instead of import
import dotenv from 'dotenv';    // Optional: For loading environment variables (e.g., MongoDB URI)

dotenv.config();

// Define the products you want to create
const products = [
    {
        name: "Andamen Polo Collar Cotton T-shirt",
        slug: "andamen-polo-collar-cotton-t-shirt-green-m",
        description: "This T-shirt is designed with a classic polo collar, crafted from soft knitted cotton, and features a button closure for a comfortable, casual fit.",
        images: ["https://assets.myntassets.com/assets/images/22045532/2023/2/20/2e19118b-268c-40e1-acd2-b3e8d9f10b911676860846526AndamenMenGreenPoloCollarT-shirt1.jpg"],
        collections: ["TShirt"],
        color: "green",
        size: "M",
        price: 3590,
        mrp: 3590,
        stock: 50,
        review: 113,
        rating: 4.1,
        gst: 18,
        hsn: "22045532",
        sku: "APCTTS3",
        order_by: 1,
        status: "active",
        related: null
    },
    // {
    //     name: "Blue Jeans",
    //     slug: "blue-jeans",
    //     description: "Comfortable blue jeans for casual wear",
    //     images: ["blue-jeans.jpg"],
    //     collections: ["summer-collection"],
    //     color: "Blue",
    //     size: "L",
    //     price: 39.99,
    //     mrp: 45.00,
    //     stock: 50,
    //     review: 0,
    //     rating: 4,
    //     gst: 18,
    //     hsn: "5678",
    //     sku: "BJ-001",
    //     order_by: 2,
    //     status: "active",
    //     related: null
    // }
];

// Define the API endpoint URL
const apiUrl = 'http://localhost:3000/api/product';

// Function to create products by sending POST request
const createProducts = async () => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(products), // Convert products array to JSON
        });

        // Check if the response is OK (status code 2xx)
        if (!response.ok) {
            throw new Error(`Failed to create products: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Products created successfully:', data);
    } catch (error) {
        console.error('Error creating products:', error);
    }
};

// Run the createProducts function
// createProducts();


// Define the products to update
const updates = [
    {
        slug: "andamen-polo-collar-cotton-t-shirt-red-s",
        data: {
            // price: 29.99,
            stock: 150,
        },
    },
];

// Define the API endpoint URL
const updateApiUrl = "http://localhost:3000/api/product";

// Function to update products via API
const updateProducts = async () => {
    try {
        const response = await fetch(updateApiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updates), // Send updates as request body
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Failed to update products: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Products updated successfully:", data);
    } catch (error) {
        console.error("Error updating products:", error);
    }
};

// Run the updateProducts function
updateProducts();

