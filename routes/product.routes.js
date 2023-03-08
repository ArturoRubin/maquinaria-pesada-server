const express = require("express");
const { mongoose } = require("mongoose");
const router = express.Router();

const Product = require("../models/Product.model");

router.post("/products", (req, res, next) => {
    const { nombre, descripcion, precio, imagen, user } = req.body;

    if (nombre === "" || descripcion === "" || precio === "" || imagen === "") {
        res.status(400).json({ message: "Provide name, description, price and image" });
        return;
    }

    Product.create({ nombre, descripcion, precio, imagen, user })
        .then((createdProduct) => {
            const { nombre, descripcion, precio, imagen, _id, user } = createdProduct;

            const product = { nombre, descripcion, precio, imagen, _id, user };
            //product.imagen = Buffer.from(product.imagen,'base64');
            res.status(201).json({ product: product });
        })
        .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});
// routes/project.routes.js
// ...

// GET /api/products -  Retrieves all of the projects
router.get('/products', (req, res, next) => {
    Product.find().populate('user')
        .then(allProducts => {
            let newProducts = allProducts.map((product) => {
                return {
                    nombre: product.nombre,
                    descripcion: product.descripcion,
                    precio: product.precio,
                    imagen: product.imagen,
                    _id: product._id,
                    user: product.user.email
                }
            });
            res.json(newProducts)
        })
        .catch(err => res.json(err));
});

router.delete('/products/:productId', (req, res, next) => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Product.findByIdAndRemove(productId)
        .then(() => res.json({ message: `Product with ${productId} is removed successfully.` }))
        .catch(error => res.json(error));
});

module.exports = router;
