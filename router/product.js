const express = require("express");
const { cloudinary, signUpload } = require("../config/cloudinary");
const isAuth = require("../middleware/auth");
const router = express.Router();
const Product = require("../models/productSchema");

const sig = signUpload();
console.log(sig);

//upload image for product
router.post("/upload", async (req, res) => {
    try {
        const fileStr = req.body.data;

        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "my_products",
            signature: sig.signature,
        });
        console.log(uploadResponse);
        res.status(200).json({ msg: "yessss", uploadResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wrong", err });
    }
});
//get all images
router.get("/images", async (req, res) => {
    try {
        const { resources } = await cloudinary.search
            .expression("folder:my_products")
            .sort_by("public_id", "desc")
            .max_results(30)
            .execute();

        const publicIds = resources.map((file) => file.public_id);
        res.send(publicIds);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wrong2" });
    }
});
//get one image
router.get("/image", async (req, res) => {
    try {
        const { resources } = await cloudinary.search
            .expression("folder:my_products")
            .sort_by("version", "desc")
            .max_results(1)
            .execute();
        const Url = resources[0].url;

        res.status(200).send(Url);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wronggggg" });
    }
});
//post new product
//post
router.post("/addproduct", isAuth, async (req, res) => {
    try {
        const { imageURL, title, description } = req.body;
        // const imageURL = await cloudinary.uploader.upload(req.file.path, {
        //     upload_preset: "my_products",
        //     signature: sig.signature,
        // });

        console.log(imageURL);
        console.log(title);
        console.log(description);

        if (!title || !description || !imageURL) {
            return res.status(400).send("infos are required");
        }
        const product = new Product({
            title,
            description,
            imageURL,
            //image: imageURL.url,
        });

        await product.save();
        res.status(200).send({ msg: "event added", product });
    } catch (error) {
        console.error(error);
        res.status(500).send("impossible to add a new product");
    }
});

//get all products
router.get("/allproducts", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send({ msg: "here are your products", products });
    } catch (error) {
        res.status(500).send("impossible to get products");
    }
});

module.exports = router;
