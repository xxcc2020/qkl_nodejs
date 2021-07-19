//导入引用的库和配置
const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");


//**************************************************************************
//创建一个新的TRX账号
//**************************************************************************
exports.createNewAccount = async () => {
	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);
	const result = await tronWeb.createAccount();
	var acd = {
		Base58: result.address.base58,
		Hex: result.address.hex,
		PrivateKey: result.privateKey,
		PublicKey: result.publicKey,
	}
	fw_log.debug("创建新的TRX账号信息: {0}}".format(JSON.stringify(acd)));
	return acd;
}


//**************************************************************************
//获取TRX的余额
//**************************************************************************
exports.getTrxBalance = async (address) => {
	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);
    var result = await tronWeb.trx.getBalance(address);
	fw_log.debug("获取地址的TRX余额信息: address={0}, TRX={1}".format(address, result));
	var trx = parseFloat("{0}".format(result));
	return trx;
}


//**************************************************************************
//获取USDT的余额
//**************************************************************************
exports.getUsdtBalance = async (privateKey, address) => {
	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
	const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
	const {abi} = await tronWeb.trx.getContract(CONTRACT);
	const contract = tronWeb.contract(abi.entrys, CONTRACT);
	const result = await contract.methods.balanceOf(address).call();
	fw_log.debug("获取地址的USDT余额信息: address={0}, USDT={1}".format(address, result));
	var usdt = parseFloat("{0}".format(result));
	return usdt;
}


//**************************************************************************
//转账USDT
//**************************************************************************
exports.sendTransactionUSDT = async (privateKey, address, count) => {
	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
	const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
	const {abi} = await tronWeb.trx.getContract(CONTRACT);
	const contract = tronWeb.contract(abi.entrys, CONTRACT);
	const resp = await contract.methods.transfer(address, count).send();
	fw_log.info("转账USDT信息:" + resp);
	return resp;
}


//**************************************************************************
//转账TRX
//**************************************************************************
exports.sendTransactionTRX = async (privateKey, address, count) => {
	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
	const resp = await tronWeb.trx.sendTransaction(address, count)
	fw_log.info("转账TRX信息:" + JSON.stringify(resp));
	return resp.txid;
}


//**************************************************************************
//查询Trx转账记录
//**************************************************************************
exports.getTransaction = async (txid) => {
	const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);
	const resp = await tronWeb.trx.getTransaction(txid)
	fw_log.info("Trx转账记录:" + JSON.stringify(resp));
	return resp;
}

