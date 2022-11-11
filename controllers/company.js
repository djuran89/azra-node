const CompanyModel = require("./../models/company");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(8);

const done = { sucess: "ok" };
exports.createCompany = async (req, res, next) => {
	try {
		const requestAccount = req.body;
		const hashPassword = bcrypt.hashSync(requestAccount.Password, salt);

		const Company = new CompanyModel({ ...requestAccount, Password: hashPassword });
		await Company.save();

		req.session.Company = requestAccount.Email;
		res.status(200).json(requestAccount.Email);
	} catch (err) {
		next(err);
	}
};

exports.loginCompany = async (req, res, next) => {
	try {
		const { Email, Password } = req.body;
		const findCompany = await CompanyModel.findOne({ Email });
		if (findCompany === null) throw Error("Email nije pronadjen.");

		const comparePassword = await bcrypt.compare(Password, findCompany.Password);
		if (!comparePassword) throw Error("Pogresna lozinka.");

		req.session.Company = findCompany.Email;
		req.session.CompanyId = findCompany._id;
		res.status(200).json(findCompany);
	} catch (err) {
		next(err);
	}
};

exports.isLoginCompany = async (req, res, next) => {
	try {
		const Email = req.session.Company;
		if (!Email) return res.status(200).json(null);

		const findCompany = await CompanyModel.findOne({ Email });
		if (findCompany === null) req.session.destroy();

		res.status(200).json(findCompany);
	} catch (err) {
		next(err);
	}
};

exports.logoutCompany = async (req, res, next) => {
	try {
		req.session.destroy();
		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};
