const SHA256 = require('crypto-js/sha256');

class Block {

	constructor(data){
		this.id = 0;
        this.nonce = 144444;
      	this.body = data;
      	this.hash = "";
    }


    generateHash() {
        // Use this to create a temporary reference of the class object
        let self = this;
      //Implement your code here

      var promise = new Promise(function(resolve, reject) {
        // do a thing, possibly async, then…
        var stringified_obj = JSON.stringify(self); 
        self.hash = SHA256(stringified_obj);        
        
        if (self.hash) {
          resolve(self);
        }
        else {
          reject(Error("It is broken"));
        }
      });      
      return promise;      
  }


}

// Exporting the class Block to be reuse in other files
module.exports.Block = Block;
