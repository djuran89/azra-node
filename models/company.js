const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongooseSchema = new Schema(
	{
		Email: { type: String, required: true, unique: true },
		Password: { type: String, required: true },
		CompanyName: { type: String, required: false },
		Address: { type: String, required: true },
		PIB: { type: String, required: true },
		Phone: { type: String, required: true },
		DeliveryAddress: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Company", mongooseSchema);
