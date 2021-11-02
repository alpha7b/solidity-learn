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
