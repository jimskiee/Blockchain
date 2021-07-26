import UnVote from "./UnVote";
import React from 'react';
import parse from 'html-react-parser';
import { uuid } from 'uuidv4';
import Web3 from 'web3'
import { Grid, Image } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import Paidvoter from './contracts/Paidvoter.json'

class VoteHome extends React.Component {

    state = {
      votestate: '',
      compare: 'none',
      id: uuid(),
      checkedCat: parse(''),
      checkedDog: parse(''),
      state: null,
      contract: null,
      account: null,
      candidates:[]
    };


    async componentWillMount() {
      await this.loadWeb3();
    }
    async componentDidMount()
    {
		await this.loadBlockchainData();
    }

    async loadWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
		} else {
			window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
		}
	}

    async loadBlockchainData() {
		const web3 = window.web3
		// Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] }) //0x536390eB29b638B89d10F17C386ff4B6Dac17354
        let balance = await web3.eth.getBalance(accounts[0]);
        await this.setState({balance: web3.utils.fromWei(balance, 'Ether')})
        const networkId = await web3.eth.net.getId()
        const networkData = Paidvoter.networks[networkId]

        console.log("networkData"+networkData);

		if(networkData) {
            //alert('loadBlockchainData'+networkData.address) //0xb74e0eC37ABBC87644F9eC6fE1ECB16b1fac1722
            const paidvoter = new web3.eth.Contract(Paidvoter.abi, networkData.address)
            const catNumvoted = await paidvoter.methods.voteCountCandidate1().call()
            const dogNumvoted = await paidvoter.methods.voteCountCandidate2().call()
            //const catname=await paidvoter.methods.candidates(0).name
            this.setState({ paidvoter,catNumvoted,dogNumvoted})
            const candid =[];
			for (var i = 0; i <= 1; i++) {
            const candidates = await paidvoter.methods.candidates(i).call
            candid[i]=candidates;
      }
        this.setState({candidates: candid})
		} else {
			  window.alert('Paidvoter contract not deployed to detected network.')
		}
	}


    onFormSubmit = async (event) => {
      console.log('onFormSubmit ' + event);
      event.preventDefault();
  
      //let compare ='none';
      const votex = this.state.votestate;
      const compare = this.state.compare;
      const id = this.state.id;
      console.log('Voting for ' + votex + ' with ID=' + id);
      console.log('#value votestate=' + votex + ' #value compare=' + compare);

      const addrFro = await window.web3.eth.getAccounts(); 
      const addrFrom = addrFro[0]
      //Submit and pay to Smart Contract (network)
       if (votex=='cat')
       {
            this.state.paidvoter.methods.purchaseVoteCandidate(0,this.state.account).send({ from: this.state.account });
            await this.loadBlockchainData(); //refresh 
       }
       else
       {
            this.state.paidvoter.methods.purchaseVoteCandidate(1,this.state.account).send({ from: this.state.account });
            await this.loadBlockchainData();
       }       

       //id == id && already vote
      if (compare !== 'none') {
        console.log('Goto Update');
        //Update        
      }
      else {
        console.log('Goto Insert');
        //Insert
      }
  
      if (votex === 'cat') {
        this.setState({
          checkedCat: parse('<i class="fa fa-check-circle">'),
          checkedDog: parse('')
        });
      } else {
        this.setState({
          checkedCat: parse(''),
          checkedDog: parse('<i class="fa fa-check-circle">')
        });
      }  
      this.setState({
        votestate: votex,
        compare: votex
      });
  
    }
  
    onUndoSubmit = async (event) => {
      event.preventDefault();
      console.log("onUndoSubmit");
  
      this.setState({
        checkedCat: parse(''),
        checkedDog: parse(''),
        compare: 'none'
      });
      const idx = this.state.id;
      console.log('Undo Voting process ID=' + idx);
    }
  
    render() { //render
      return (
  
        <Container textAlign='center'>
            <h1>[Good Day]</h1>
            <h2>Vote Your Favourite Pet!</h2>
            <h3>Cat vs Dog!</h3>

            <form id="choice" name='form' method="POST" onClick={e => this.setState({ votestate: e.target.value })} onSubmit={this.onFormSubmit}>
            <Grid columns={2} >
            <Grid.Row>
                <Grid.Column>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'></Image> A
                </Grid.Column>

                <Grid.Column>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png'></Image> B
                </Grid.Column>
            </Grid.Row>
            
            <Grid.Row>
            <Grid.Column>
              <button id="b" type="submit" name="vote" className="a" value="cat">Cats {this.state.checkedCat} </button>
            </Grid.Column>
            <Grid.Column>
              <button id="a" type="submit" name="vote" className="b" value="dog">Dogs {this.state.checkedDog}</button>
            </Grid.Column>
            </Grid.Row>
            </Grid>

          <div h1> {this.state.account}</div>
          <div h1> `"#catNumvoted"+{this.state.catNumvoted}+"#B"`</div>
          <div h1> `"#dogNumvoted="+{this.state.dogNumvoted}+"#B"`</div>

        </form>
            <div id="tip">
              (Tip: you can not change your vote or need to pay again)
            </div>
            <br />
            <div id="hostname">
              Processed by session ID {this.state.id}
            </div>
            <br/>
            <form id="choice" name='form' method="POST" onClick={this.onUndoSubmit} >
              <UnVote> Vote Me</UnVote>
            </form>
         </Container>
      );
    }
  } //render
  export default VoteHome;
