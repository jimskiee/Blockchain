import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import { typeOf } from 'react-is';
import { Button,Segment,Grid} from 'semantic-ui-react'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Token from './artifacts/contracts/Token.sol/Token.json'


const greeterAddress='0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1';
const tokenAddress  ='0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';


function App() {
  const [greeting,setGreetingValue]=useState('')
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()


  async function requestAccount()
  {
    await window.ethereum.request({method:'eth_requestAccounts'})
  }

  async function fetchGreeting ()
  {
    if(typeOf (window.ethereum)!=='undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress,Greeter.abi,provider)
      try{
        const data = await contract.greet()
        console.log ('data',data)
      }
      catch(err)
      {
        console.log ('error',err)
      }
    }

  }

  async function setGreeting ()
  {
    
    if (!greeting) return
      if(typeOf (window.ethereum)!=='undefined') {
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(greeterAddress,Greeter.abi,signer)
        const transaction = await contract.setGreeting(greeting)
        await transaction.wait()
        fetchGreeting()
        }
  }



  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOfAccount(account);
      console.log("Balance: ", balance);
    }
  }


  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App-header">


          <Segment inverted style={{margin:'10px',padding:'50px'}}>
          <Grid centered columns={1}>
          <Grid.Row centered columns={1}>

              <Grid.Column>
              <Button basic inverted color='red' onClick={fetchGreeting}>Fetch Greeting</Button>    
              <Button basic inverted color='yellow' onClick={setGreeting}>Set Greeting</Button>
              <input onChange={e=> setGreetingValue(e.target.value)}
                      placeholder="Set Greeting"
                ></input>
              </Grid.Column>
          </Grid.Row>
          </Grid>
          </Segment>
 
          <br />

        <Segment inverted style={{marginTop:'30px;',padding:'50px 0'}}>
          <Grid centered columns={1}>
          <Grid.Row centered columns={1}>
            <Button basic inverted color='purple' onClick={getBalance}>Get Balance</Button>
            <Button basic inverted color='orange' onClick={sendCoins}>Send Coins</Button>
          </Grid.Row>

          <Grid.Row centered columns={1}>
          <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
          <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
          </Grid.Row>
        </Grid>
        </Segment>
    </div>
  );
}

export default App;
