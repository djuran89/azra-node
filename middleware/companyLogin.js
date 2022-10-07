exports.isLoginCompany = (req, res, next) => {
	if (!req.session.Company) return res.status(401).send("Unauthorized");
	next();
};
