const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");

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
		const findProducts = await ProductModel.find({ active: true }).select("-image");

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
		const findCategories = await CategoryModel.find();

		res.status(200).json(findCategories);
	} catch (err) {
		next(err);
	}
};

exports.createProduct = async (req, res, next) => {
	try {
		const imageName = req.body._id;
		const base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
		const categoryId = req.body.categoryObj._id;

		if (categoryId === undefined) {
			const newCategory = await createCategory(req.body.categoryObj.name);
			req.body.categoryObj = newCategory;
		}

		const createOrder = new ProductModel(req.body);
		await createOrder.save();

		// require("fs").writeFileSync(`${process.env.IMG_PATH}${imageName}.png`, base64Data, "base64", function (err) {
		// 	throw new Error(err);
		// });

		res.status(200).json(createOrder);
	} catch (err) {
		next(err);
	}
};

exports.updateProduct = async (req, res, next) => {
	try {
		const imageName = req.body._id;
		const base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");

		const updateProduct = await ProductModel.findByIdAndUpdate(req.body._id, req.body);

		require("fs").writeFileSync(`${process.env.IMG_PATH}${imageName}.png`, base64Data, "base64", function (err) {
			throw new Error(err);
		});

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

const createCategory = async (name) => {
	const createCategory = new CategoryModel({ name });
	const saveCategory = await createCategory.save();

	return saveCategory;
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

exports.toDo = async (req, res, next) => {
	try {
		const products = req.body;
		for (const prod of products) {
			// const findCategory = await CategoryModel.findOne({ name: prod.category });
			// console.log(findCategory._id)
			// console.log(findCategory)
			// delete prod.category;
			// const updateProduct = await ProductModel.findByIdAndUpdate(prod._id, { categoryObj: ObjectId(findCategory._id) });
			// if (findCategory == null) {
			// 	const newCategory = new CategoryModel({ name: prod.category });
			// 	await newCategory.save();
			// }
		}

		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};

const saveImageToFile = async (products) => {
	for (const prod of products) {
		const base64Data = prod.image.replace(/^data:image\/png;base64,/, "");
		const imageName = prod._id;

		await require("fs").writeFileSync(`./../react/public/proizvodi/${imageName}.png`, base64Data, "base64", function (err) {
			console.log(err);
		});
	}
};
