const ObjectId = require("mongodb").ObjectID;
const OrderModel = require("./../models/order");
const DeletedOrders = require("./../models/deletedOrders");
const email = require("../middleware/email");

const done = { sucess: "ok" };
exports.createOrder = async (req, res, next) => {
	try {
		const order = req.body;

		removeProperyOrder(order.Orders);

		const createOrder = new OrderModel(order);
		const saveOrder = await createOrder.save();
		email.send(saveOrder);

		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};

exports.getOrders = async (req, res, next) => {
	try {
		const findOrder = await OrderModel.find({ $or: [{ Active: true }, { Active: null }] }).sort({ createdAt: -1 });
		res.status(200).json(findOrder);
	} catch (err) {
		next(err);
	}
};

exports.getOrdersByUser = async (req, res, next) => {
	try {
		const Company = req.session.CompanyId;
		if (Company === undefined) return res.status(401).json("Unauthorized");

		const findOrder = await OrderModel.find({ Company }).sort({ createdAt: -1 });
		res.status(200).json(findOrder);
	} catch (err) {
		next(err);
	}
};

exports.deleteOrder = async (req, res, next) => {
	try {
		const Order = req.body.Order;
		await OrderModel.findOneAndUpdate({ _id: Order._id }, { Active: false });

		const findOrder = await OrderModel.find({ $or: [{ Active: true }, { Active: null }] }).sort({ createdAt: -1 });
		res.status(200).json(findOrder);
	} catch (err) {
		next(err);
	}
};

exports.createOrderForCompany = async (req, res, next) => {
	try {
		const orders = removeProperyOrder(req.body.orders);
		const user = req.body.user;
		const model = {
			Ime: `${user.CompanyName} - PIB: ${user.PIB}`,
			Prezime: " ",
			Adresa: user.DeliveryAddress,
			PostanskiBroj: " ",
			Grad: " ",
			Drzava: " ",
			Telefon: user.Phone,
			Email: user.Email,
			Napomena: user.Napomena,
			Orders: orders,
			Company: user._id,
		};

		if (orders.length === 0) throw Error("Poručbina nepostoji...");

		const createOrder = new OrderModel(model);
		const saveOrder = await createOrder.save();
		email.send(saveOrder);

		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};

const removeProperyOrder = (orders) => {
	const removePropery = ["smallDescription", "colors", "image", "description"];
	for (const order of orders) {
		for (const [key, value] of Object.entries(order)) {
			if (removePropery.includes(key)) {
				delete order[key];
			}
		}
	}
	return orders;
};
