const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const productSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "Name is required."],
    },
    descripcion: {
      type: String,
      required: [true, "Description is required."],
    },
    precio: {
      type: Number,
      required: [true, "Price is required."],
    },
    imagen: {
        type: String,
        required: [true, "Image is required."],
    },
    user:  { type: Schema.Types.ObjectId, ref: 'User' } 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
