// connecter la db
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/contentDB')
    console.log(`MongoDB connecté`);
  } catch (error) {
    console.error(` Problème lors de la connection`, error);
    process.exit(1)
  }
}

export default connectDB