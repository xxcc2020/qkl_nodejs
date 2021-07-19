//创建trx充值地址
var CreateTrxAccountReq = {
    UserId,        //int 用户Id
}

//创建trx充值地址
var CreateTrxAccountAck = {
	Code,          //int
	Msg,           //string
	UserId,        //int
	AddressTyp,    //int 默认1:trx地址   
	Base58,        //string base58格式地址
	Hex,           //string hex格式地址
	PrivateKey,    //string 私钥
	PublicKey,     //string 公钥
}

//获取TRX资产余额
var QueryTrxBalanceReq = {
    Address,       //string base58格式地址trx
}

//获取TRX资产余额
var QueryTrxBalanceAck = {
	Code,          //int
	Msg,           //string
	TRX,           //float trx余额
}

//获取USDT资产余额
var QueryUsdtBalanceReq = {
    Address,       //string base58格式地址trx
    PrivateKey,    //string 该地址的私钥
}

//获取USDT资产余额
var QueryUsdtBalanceAck = {
	Code,          //int
	Msg,           //string
	USDT,          //float usdt余额
}

//转账USDT
var TransactionUsdtReq = {
    PrivateKey,    //string 转出账户的trx地址私钥
    Address,       //string 转入账户的trx地址
    Count,         //float  转账数量  1000000 = 1 USDT
}

//转账USDT
var TransactionUsdtAck = {
	Code,          //int
	Msg,           //string
	TxId,          //string 区块链交易id
}

//转账TRX
var TransactionTrxReq = {
    PrivateKey,    //string 转出账户的trx地址私钥
    Address,       //string 转入账户的trx地址
    Count,         //float  转账数量  1000000 = 1 TRX
}

//转账TRX
var TransactionTrxAck = {
	Code,          //int
	Msg,           //string
	TxId,          //string 区块链交易id
}

//查询USDT转账列表
var QueryUsdtTransactionListReq = {
	Address, 	   //string 账户的trx地址私钥
}

//查询USDT转账列表
var QueryUsdtTransactionListAck = {
	Data, 	   	   //array 转账记录的数据结构体列表
}

//查询单条Trx转账
var QueryTrxTransactionReq = {
	TxId, 	       //string 区块链交易Id
}

//查询单条Trx转账
var QueryTrxTransactionAck = {
	Data, 	      //array 转账记录的数据结构体列表
}