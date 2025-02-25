import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    headline: { type: String, required: true },
    caption: { type: String, required: true }, 
    publishedAt: { type: Date, required: true },
    imageUrl: { type: String, required: true }, 
    author: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true }
}, { versionKey: false});

const article = mongoose.model("news", articleSchema);

export default article;