import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    nom: { type: String, required: true },
    email: { type: String, required: true },
    sujet: { type: String, default: "" },
    message: { type: String, required: true },
    lu: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
