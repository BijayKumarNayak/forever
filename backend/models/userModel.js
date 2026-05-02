import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowerCase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "", // store avatar image URL
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false, timestamps: true },
);

const User = mongoose.model.user || mongoose.model("user", userSchema);
export default User;
