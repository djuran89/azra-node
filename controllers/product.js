const ProductModel = require("../models/product");

const done = { sucess: "ok" };

exports.getProductById = async (req, res, next) => {
	try {
		const findProduct = await ProductModel.findById(req.params.productId);
		res.status(200).json(findProduct);
	} catch (err) {
		next(err);
	}
};

exports.getActiveProducts = async (req, res, next) => {
	try {
		const findProducts = await ProductModel.find({ active: true });
		res.status(200).json(findProducts);
	} catch (err) {
		next(err);
	}
};

exports.getProductsAll = async (req, res, next) => {
	try {
		const findProducts = await ProductModel.find().select("-image");
		res.status(200).json(findProducts);
	} catch (err) {
		next(err);
	}
};

exports.getCategories = async (req, res, next) => {
	try {
		const findCategories = await ProductModel.find().select("category -_id");
		const categories = [...new Set(findCategories.map((el) => el.category))];

		res.status(200).json(categories);
	} catch (err) {
		next(err);
	}
};

exports.createProduct = async (req, res, next) => {
	try {
		const createOrder = new ProductModel(req.body);
		await createOrder.save();

		res.status(200).json(createOrder);
	} catch (err) {
		next(err);
	}
};

exports.updateProduct = async (req, res, next) => {
	try {
		const updateProduct = await ProductModel.findByIdAndUpdate(req.body._id, req.body);

		res.status(200).json(updateProduct);
	} catch (err) {
		next(err);
	}
};

exports.updateProductActive = async (req, res, next) => {
	try {
		await ProductModel.findByIdAndUpdate(req.body._id, { active: req.body.active });
		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};

exports.updateProductPrice = async (req, res, next) => {
	try {
		if (isNaN(parseInt(req.body.price))) throw Error("Cena nije broj.");
		await ProductModel.findByIdAndUpdate(req.body._id, { price: req.body.price });
		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};

exports.removeProduct = async (req, res, next) => {
	try {
		const Product = req.body.product;
		const deletedProduct = await ProductModel.findOneAndDelete(Product);

		res.status(200).json(deletedProduct);
	} catch (err) {
		next(err);
	}
};

exports.createMany = async (req, res, next) => {
	try {
		// for (let p of products) {
		// 	delete p.id;
		// 	p.category = "Voće";
		// 	const createOrder = new ProductModel(p);
		// 	await createOrder.save();
		// }

		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};

exports.updateMany = async (req, res, next) => {
	try {
		// const updateMany = await ProductModel.updateMany({ active: true });

		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};
