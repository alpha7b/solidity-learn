import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { useEffect} from 'react';

function App() {

  const init = async () => {
    await window.ethereum.enable() //连接小狐狸
    const web3 = new Web3(window.web3.currentProvider) //连接小狐狸里定义的rpc
    const n = await web3.eth.getBlockNumber()
    console.log(n)


  const contract = new web3.eth.Contract(
    [
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
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    "0x6dCa6f90631961a40A1C142305855bed9b833928",
  )

  const text = await contract.methods.get().call();
  console.log(text);

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
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
