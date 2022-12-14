const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongooseSchema = new Schema(
	{
		Ime: { type: String, required: true },
		Prezime: { type: String, required: true },
		Adresa: { type: String, required: true },
		PostanskiBroj: { type: String, required: true },
		Grad: { type: String, required: true },
		Opciono: { type: String, required: false },
		Drzava: { type: String, required: true },
		Telefon: { type: String, required: true },
		Email: { type: String, required: true },
		Napomena: { type: String, required: false },
		Orders: { type: Array, required: true },
		Active: { type: Boolean, default: true },
		Company: {
			type: Schema.Types.ObjectId,
			ref: "Company",
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", mongooseSchema);
