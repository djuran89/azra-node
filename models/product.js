const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongooseSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String, required: false },
		image: { type: String, required: true },
		category: { type: String, required: true },
		colors: { type: Array, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", mongooseSchema);
