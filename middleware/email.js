"use strict";
const sendgrid = require("@sendgrid/mail");
const reMapQuntitiy = require("./../helpers/setQuantityValue");
const moment = require("moment");
exports.send = async (order) => {
	try {
		const html = createHtml(order);
		const SENDGRID_API_KEY = process.env.API_KEY;
		sendgrid.setApiKey(SENDGRID_API_KEY);
		console.log(process.env.SEND_MAIL_TO);
		const msg = {
			to: process.env.SEND_MAIL_TO,
			from: "djuran89@gmail.com",
			subject: `Azra 🐒 je dobila porucbina - ${moment(new Date()).format("DD MMM YYYY, hh:mm")}`,
			text: "test",
			html: html,
		};

		sendgrid
			.send(msg)
			.then((resp) => {
				console.log("Email sent");
			})
			.catch((error) => {
				console.error(error);
			});
	} catch (err) {
		console.error(err);
	}
};

const createHtml = (order) => {
	return `<table border={0}>
			<thead>
				<tr>
					<th>Proizvod</th>
					<th>Kolicina</th>
					<th>Cena</th>
				</tr>
			</thead>
			<tbody>
				 ${order.Orders.map(
						(el, i) =>
							`<tr key={${i}}>
								<td style="padding: 4px">${el.name}</td>
								<td style="padding: 4px">${reMapQuntitiy.setQuantityValue(el.quantity, el)}</td>
								<td style="padding: 4px">${el.quantity * el.price},00 RSD</td>
							</tr>`
					)} 
				<tr>
					<td colSpan={2} style="padding: 4px">Ukupno</td>
					<td colSpan={2} style="padding: 4px"></td>
					<td style="padding: 4px">${order.Orders.map((el) => el.quantity * el.price).reduce((a, b) => a + b)},00 RSD</td>
				</tr>
			</tbody>
		</table>`;
};
