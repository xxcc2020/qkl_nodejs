//导入引用的库和配置
var express = require('express');
//http服务器
var http_server = express();

//设置跨域访问
http_server.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("X-Powered-By", "4.2.1");
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});


//**************************************************************************
//外部最后调用这个方法启动http服务
//**************************************************************************
exports.start = function () {
	var listenPort = CONFIG.trx_server.http_port;
	var name = CONFIG.trx_server.name;
	http_server.listen(listenPort);
	fw_log.debug("启动" + name + "-监听端口:" + listenPort);
};


//**************************************************************************
//创建TRX的账号
//**************************************************************************
http_server.post("/CreateTrxAccountReq", function (req, res) {
	var recvData = '';     
	req.on('data', function(chunk){recvData += chunk;});
	req.on('end', function(){    
		var recvMsg = JSON.parse(recvData);
		fw_log.debug("收到HTTP请求-创建TRX的账号->: " + JSON.stringify(recvMsg));
		async function ExcuteFunc(){
			var acd = await trx_util.createNewAccount();
			var AckData = {
				Code: 0,
				Msg: "success",
				UserId:recvMsg.UserId,
				AddressType: 1,
				Base58: acd.Base58,
				Hex: acd.Hex,
				PrivateKey: acd.PrivateKey,
				PublicKey: acd.PublicKey,
			}
			res.send(JSON.stringify(AckData));
		}
		ExcuteFunc();
	});
});


//**************************************************************************
//获取TRX资产余额
//**************************************************************************
http_server.post("/QueryTrxBalanceReq", function (req, res) {
	var recvData = '';     
	req.on('data', function(chunk){recvData += chunk;});
	req.on('end', function(){    
		var recvMsg = JSON.parse(recvData);
		fw_log.debug("收到HTTP请求-获取TRX资产余额->: " + JSON.stringify(recvMsg));
		var AckData = {
			TRX: 0,
		}
		async function ExcuteFunc(){
			AckData.USDT = await trx_util.getTrxBalance(recvMsg.Address);
			res.send(JSON.stringify(AckData));
		}
		ExcuteFunc();
	});
});


//**************************************************************************
//获取USDT资产余额
//**************************************************************************
http_server.post("/QueryUsdtBalanceReq", function (req, res) {
	var recvData = '';     
	req.on('data', function(chunk){recvData += chunk;});
	req.on('end', function(){    
		var recvMsg = JSON.parse(recvData);
		fw_log.debug("收到HTTP请求-获取USDT资产余额->: " + JSON.stringify(recvMsg));
		var AckData = {
			USDT: 0,
		}
		async function ExcuteFunc(){
			AckData.USDT = await trx_util.getUsdtBalance(recvMsg.PrivateKey, recvMsg.Address);
			res.send(JSON.stringify(AckData));
		}
		ExcuteFunc();
	});
});


//**************************************************************************
//转账USDT
//**************************************************************************
http_server.post("/TransactionUsdtReq", function (req, res) {
	var recvData = '';     
	req.on('data', function(chunk){recvData += chunk;});
	req.on('end', function(){    
		var recvMsg = JSON.parse(recvData);
		fw_log.debug("收到HTTP请求-转账USDT->: " + JSON.stringify(recvMsg));
		var AckData = {
			TxId: 0,
		}
		async function ExcuteFunc(){
			AckData.TxId = await trx_util.sendTransactionUSDT(recvMsg.PrivateKey, recvMsg.Address, recvMsg.Count);
			res.send(JSON.stringify(AckData));
		}
		ExcuteFunc();
	});
});


//**************************************************************************
//转账TRX
//**************************************************************************
http_server.post("/TransactionTrxReq", function (req, res) {
	var recvData = '';     
	req.on('data', function(chunk){recvData += chunk;});
	req.on('end', function(){    
		var recvMsg = JSON.parse(recvData);
		fw_log.debug("收到HTTP请求-转账TRX->: " + JSON.stringify(recvMsg));
		var AckData = {
			TxId: 0,
		}
		async function ExcuteFunc(){
			AckData.TxId = await trx_util.sendTransactionTRX(recvMsg.PrivateKey, recvMsg.Address, recvMsg.Count);
			res.send(JSON.stringify(AckData));
		}
		ExcuteFunc();
	});
});


//**************************************************************************
//查询USDT转账列表 返回最近的100条
//**************************************************************************
http_server.post("/QueryUsdtTransactionListReq", function (req, res) {
	var recvData = '';     
	req.on('data', function(chunk){recvData += chunk;});
	req.on('end', function(){    
		var recvMsg = JSON.parse(recvData);
		fw_log.debug("收到HTTP请求-查询USDT转账列表->: " + JSON.stringify(recvMsg));
		var host = "api.trongrid.io";
		var path = "/v1/accounts/" + recvMsg.Address + "/transactions/trc20";
		var httpSendData = {only_to:true, limit:100}
		fw_http.get(host, null, path, httpSendData, true, function(code, ackData){
			var AckData = {
				Data: ackData,
			}
			res.send(JSON.stringify(AckData));
			fw_log.debug("发送HTTP回复->: " + JSON.stringify(AckData));
		})
	});
});


//**************************************************************************
//查询单条TRX转账
//**************************************************************************
http_server.post("/QueryTrxTransactionReq", function (req, res) {
	var recvData = '';     
	req.on('data', function(chunk){recvData += chunk;});
	req.on('end', function(){    
		var recvMsg = JSON.parse(recvData);
		fw_log.debug("收到HTTP请求-查询单条TRX转账->: " + JSON.stringify(recvMsg));
		var AckData = {
			Data: {},
		}
		async function ExcuteFunc(){
			AckData.Data = await trx_util.getTransaction(recvMsg.TxId);
			res.send(JSON.stringify(AckData));
		}
		ExcuteFunc();
	});
});
