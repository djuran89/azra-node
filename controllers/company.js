const CompanyModel = require("./../models/company");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(16);

const done = { sucess: "ok" };
exports.createCompany = async (req, res, next) => {
	try {
		const requestAccount = req.body;
		const hashPassword = bcrypt.hashSync(requestAccount.Password, salt);

		const Company = new CompanyModel({ ...requestAccount, Password: hashPassword });
		await Company.save();

		req.session.Company = requestAccount.CompanyName;
		res.status(200).json(requestAccount.CompanyName);
	} catch (err) {
		next(err);
	}
};

exports.loginCompany = async (req, res, next) => {
	try {
		const { Email, Password } = req.body;

		const findCompany = await CompanyModel.findOne({ Email });
		if (findCompany === null) throw throwError("Email nije pronadjen.");

		const comparePassword = await bcrypt.compare(Password, findCompany.Password);
		if (!comparePassword) throw throwError("Pogresna lozinka.");

		req.session.Company = findCompany.CompanyName;
		res.status(200).json(findCompany.CompanyName);
	} catch (err) {
		next(err);
	}
};

exports.isLoginCompany = async (req, res, next) => {
	try {
		res.status(200).json(req.session.Company);
	} catch (err) {
		next(err);
	}
};

exports.logoutCompany = async (req, res, next) => {
	try {
		req.session.Company.destroy();
		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};
