var SHA256 = require("crypto-js/sha256");

/* not use AES
var CryptoJS = require("crypto-js");
// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);
console.log(originalText); // 'my message'
*/


const data1 = "Blockchain exercise hasing!";
const dataObject = {
	id: 1,
  	body: "With Object Works too",
  	time: new Date().getTime().toString().slice(0,-3)
};
function generateHash(obj) {
	// Write your code here
	var stringified_obj = JSON.stringify(obj);  
	return SHA256(stringified_obj);  
}


console.log(`SHA256 Hash: ${generateHash(data1)}`);
console.log("************************************");
console.log(`SHA256 Hash: ${generateHash(dataObject)}`);
console.log ("done generate hash");