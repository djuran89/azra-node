const string = "adj@blumind.net";

function protectString(string) {
	let retVal = "";
	let allowChar = 5;
	for (let i in string) {
		if (i < allowChar) {
			retVal += string[i];
		} else {
			retVal += "*";
		}
	}
	return retVal;
}

const protected = protectString(string);

console.log(protected);
