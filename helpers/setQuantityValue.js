exports.setQuantityValue = (quantity, product) => {
	const category = product.category;

	switch (category) {
		case "Voće":
			return quantity * 500 >= 1000 ? (quantity * 500) / 1000 + " kg" : quantity * 500 + " g";
		case "Sokovi":
			return quantity;
		default:
			return `${quantity * 100} g`;
	}
};
