const isNumber = (val) => isNaN(parseInt(val));

exports.throwError = (msg, status = 500) => {
	let err = new Error(msg);
	err.status = status;
	return err;
};

exports.validationUser = (object) => {
	for (const [key, value] of Object.entries(object)) {
		if (key === "Email") if (!value.includes("@") && !value.includes(".")) return [false, "Email nije ispravan"];
		if (key === "Zipcode") if (isNumber(value)) return [false, "Postanski broj nije ispravan"];
		if (key === "Phone") if (isNumber(value)) return [false, "Broj telefona nije ispravan"];
		if (key === "Phone") if (value.length > 10) return [false, "Broj telefona nije ispravan"];
	}
	return [true, null];
};

exports.validateUserByFields = (object, fields) => {
	checkIsEmpty(object, fields);
	specialCheck(object, fields);
};

const throwValidationError = (err, key) => {
	if (typeof key === "object") {
		const transletedKeys = key.map((el) => translateField(el));
		throw new Error(`Popunite polja: ${transletedKeys.join(", ")}`);
	} else {
		throw new Error(err);
	}
};

const checkIsEmpty = (object, fields) => {
	const emptyField = [];
	for (let key of fields) if (object[key] === "" || object[key] === null || object[key] === undefined) emptyField.push(key);
	for (let key of emptyField) throwValidationError(`${key} nije popunjena`, emptyField);
};

const specialCheck = (object, fields) => {
	for (let key of fields) {
		const value = object[key];
		if (key === "Email" && isMailValid(value)) throwValidationError(`Email adresa nije ispravna`, key);
		if (key === "Password" && value.length < passwrodLenght) throwValidationError(`Lozinka mora biti duza od ${passwrodLenght} karaktera.`, key);
		if (key === "Zipcode" && isNaN(parseInt(value))) throwValidationError(`Postanski broj nije ispravan`, key);
		if (key === "Phone" && isNaN(parseInt(value))) throwValidationError("Telefon nije ispravan", key);
	}
};

const translateField = (key) => {
	if (key === "Password") return "Lozinka";
	if (key === "Zipcode") return "Postanski broj";
	if (key === "City") return "Grad";
	if (key === "Adresss") return "Adresa";
	if (key === "Phone") return "Broj telefona";
	if (key === "Name") return "Ime i prezime";
	return key;
};
