import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    slug: string; // Base slug for the product
    description?: string;
    images: string[];
    collections: string[];
    color: string;
    size: string;
    price: number;
    mrp: number;
    stock: number;
    review: number;
    rating: number;
    gst: number;
    hsn?: string;
    sku?: string;
    order_by: number;
    status: string;
    related?: mongoose.Types.ObjectId;
}

const Timestamp = { timestamps: true }; // Mongoose uses this for createdAt and updatedAt

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String },
        images: [{ type: String }],
        collections: [{ type: String }],
        color: { type: String, required: true },
        size: { type: String, required: true },
        price: { type: Number, required: true },
        mrp: { type: Number, required: true },
        stock: { type: Number, default: 0 },
        review: { type: Number, default: 0 },
        rating: { type: Number, default: 4 },
        gst: { type: Number, default: 18 },
        hsn: { type: String },
        sku: { type: String },
        order_by: { type: Number, default: 1 },
        status: { type: String, default: "active" },
        related: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    },
    Timestamp
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
