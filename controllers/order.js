const ObjectId = require("mongodb").ObjectID;
const OrderModel = require("./../models/order");
const DeletedOrders = require("./../models/deletedOrders");

const done = { sucess: "ok" };
exports.createOrder = async (req, res, next) => {
	try {
		const order = req.body;

		removeProperyOrder(order.Orders);

		const createOrder = new OrderModel(order);
		await createOrder.save();

		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};

exports.getOrders = async (req, res, next) => {
	try {
		const findOrder = await OrderModel.find();
		res.status(200).json(findOrder);
	} catch (err) {
		next(err);
	}
};

exports.deleteOrder = async (req, res, next) => {
	try {
		const Order = req.body.Order;
		const OrderId = ObjectId(Order._id);
		delete Order._id;

		const createDeletedOrders = new DeletedOrders(Order);
		await createDeletedOrders.save();
		await OrderModel.deleteOne(OrderId);

		const findOrder = await OrderModel.find();
		res.status(200).json(findOrder);
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

		if(orders.length === 0) throw Error("Poručbina nepostoji...")

		const createOrder = new OrderModel(model);
		const retVal = await createOrder.save();

		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};
