const Web3 = require('web3')

//const web3 = new Web3('http://127.0.0.1:7545') //连接本地的RPC节点，用ganache建的，rpc地址可以在ganache里看到

const web3 = new Web3('https://rpc.ftm.tools/')

const main = async () => {
	const n = await web3.eth.getBlockNumber () //获取最新区块
	console.log(n) //打印上一步获得的最新区块
}

main()