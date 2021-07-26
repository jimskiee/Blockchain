const Helloworld = artifacts.require("Helloworld");

contract("Helloworld",accounts=>{
    //Testing Logic
    it("Constructor should have correct message",async()=>{
        let instance = await Helloworld.deployed();
        let message = await instance.message();
        assert.equal(message,"Hellow parameter constructor")
    })

    it("Owner should be accounts[0]",async()=>{
        let instance = await Helloworld.deployed();
        let owner = await instance.owner();
        assert.equal(owner,accounts[0])
    })
})