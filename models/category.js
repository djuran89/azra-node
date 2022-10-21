const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongooseSchema = new Schema(
	{
		name: { type: String, required: true },
		unit: { type: String, default: "g" },
	},
	{ timestamps: false }
);

module.exports = mongoose.model("Category", mongooseSchema);
