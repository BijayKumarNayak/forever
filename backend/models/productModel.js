import mongoose from "mongoose";

const productSchema= new mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    image:{
        type: Array,
        required: true,
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    subCategory:{
        type: String,
        required: true,
        trim: true
    },
    sizes:{
        type: Array,
        required: true,
    },
    bestSeller:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date,
        default: Date.now
    }
})
const productModel=mongoose.model.product || mongoose.model("product",productSchema)
export default productModel;