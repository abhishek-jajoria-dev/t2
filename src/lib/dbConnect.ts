import mongoose from 'mongoose';

// Declare a global variable to prevent multiple connections during hot reload in development
let isConnected: boolean = false;

const dbConnect = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        // Use your MongoDB connection string here
        const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name'; // Replace with your connection string
        await mongoose.connect(dbURI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        isConnected = true;
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};

export default dbConnect;
