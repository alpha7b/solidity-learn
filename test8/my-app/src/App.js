import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { useEffect, useState} from 'react';
let contract;
let web3;

function App() {

  const [value, setValue] = useState('')
  
  const set = async() => {
    console.log(value);

    const [from] = await web3.eth.getAccounts() //获得小狐狸的地址
    console.log(from);

    const tx = await contract.methods.set(value).send({from, value:'1000000000000000'});
    console.log(tx);
  }

  const sendEth = async() => {
    console.log(value);

    const [from] = await web3.eth.getAccounts() //获得小狐狸的地址
    console.log(from);

    const tx = await web3.eth.sendTransaction({
      from, 
      to: '0xC2383Fe93c7cf925CD85348B982C4AAF07E8C238',
      value:'1000000000000000'
    })
    console.log(tx);
  }

  const init = async () => {
    await window.ethereum.enable() //连接小狐狸
    web3 = new Web3(window.web3.currentProvider) //连接小狐狸里定义的rpc
    const n = await web3.eth.getBlockNumber()
    console.log(n)


  contract = new web3.eth.Contract(
    [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "message",
            "type": "string"
          }
        ],
        "name": "SetEvent",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "get",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_text",
            "type": "string"
          }
        ],
        "name": "set",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ],
    "0xa4B61204Ab3b579dA1DCA3C5ab025dDa9B8A3e30",
  )

  const text = await contract.methods.get().call();
  console.log(text);
  
  const res = await contract.getPastEvents('SetEvent', {fromBlock: 9573886})
  console.log(res);

  contract.events.SetEvent({fromBlock: 'latest'}).on('data', (event) =>{
    console.log(event)})

  }

  useEffect(() => {
    init()
  },[])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input onChange={(e)=>setValue(e.target.value)} />
        <button
          onClick={set}

        >
          Set
        </button>

        <button
          onClick={sendEth}

        >
          Send ETH
        </button>

      </header>
    </div>
  );
}

export default App;
