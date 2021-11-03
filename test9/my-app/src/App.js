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


  //10**18
  const v = web3.utils.toWei('1'); //将1个ether转换成wei
  console.log(v);

  const p = web3.utils.fromWei('1000000000000000000'); //10**18个wei转换成ether
  const bn1 = web3.utils.toBN('1000'); //将数字1000转换成big number类型
  const bn2 = web3.utils.BN('1000'); //将数字1000转换成big number类型
  web3.utils.isBN(); //判断一个数是否是big number类型
  web3.utils.hexToAscii('0xff'); //将16进制转换成字符串
  web3.utils.asciiToHex('abcd'); //将成字符串转换成16进制数
  web3.utils.isHex(); //判断是否是16进制
  web3.utils.toHex(); //转换成16进制

  web3.utils.padLeft('0xff', 20); //拼接transaction
  web3.utils.isAddress(); //验证是否是合法地址，比如用户打钱填入的地址需要验证是否合法
  web3.utils.sha3('v'); //把一个东西变成hash
  web3.utils.soliditySha3({type: 'uint8'}); //



  console.log(p);
  console.log(bn1);
  console.log(bn2);
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
