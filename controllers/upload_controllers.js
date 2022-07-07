const Product = require("../models/productSchema");
const { cloudinary } = require("../config/cloudinary");
const { signature } = require("../config/signatureCloudinary");
//upload image for product
const sig = signature.signuploadform();
exports.UploadImage = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "my_products",
        });
        console.log(uploadResponse);
        res.status(200).json({ msg: "yessss", uploadResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wrong", err });
    }
};
//get all images
exports.GetAllImages = async (req, res) => {
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
};
//get one image
exports.GetOneImage = async (req, res) => {
    try {
        const { resources } = await cloudinary.search
            .expression("folder:my_products")
            .sort_by("public_id", "desc")
            .max_results(1)
            .execute();
        const Url = resources[0].url;
        res.send(Url);
        res.status(200).json({ msg: "yessss", Url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wronggggg" });
    }
};
//post new product
//post
exports.AddNewProduct = async (req, res) => {
    try {
        const { imageURL, title, description } = req.body;
        if (!title || !description || !imageURL) {
            return res.status(400).send("infos are required");
        }
        const product = new Product({
            title,
            description,
            imageURL,
        });

        await product.save();
        res.status(200).send({ msg: "event added", product });
    } catch (error) {
        res.status(500).send("impossible to add a new product");
    }
};

exports.GetAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send({ msg: "here are your products", products });
    } catch (error) {
        res.status(500).send("impossible to get products");
    }
};
