const done = { sucess: "ok" };

exports.loginUser = async (req, res, next) => {
	try {
		const username = process.env.USER_LOGIN;
		const password = process.env.PASS_LOGIN;
		const { Username, Password } = req.body;
		if (username.toLocaleLowerCase() !== Username.toLocaleLowerCase()) throw new Error("Pogresan username");
		if (password !== Password) throw new Error("Pogresana lozinka");

		req.session.Username = Username;
		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};

exports.isLogin = async (req, res, next) => {
	try {
		res.status(200).json(req.session.Username);
	} catch (err) {
		next(err);
	}
};

exports.logoutUser = async (req, res, next) => {
	try {
		req.session.destroy();
		res.status(200).json(done);
	} catch (err) {
		next(err);
	}
};
