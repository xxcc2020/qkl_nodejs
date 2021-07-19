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
	var listenPort = CONFIG.eth_server.http_port;
	var name = CONFIG.eth_server.name;
	http_server.listen(listenPort);
	fw_log.debug("启动" + name + "-监听端口:" + listenPort);
};


//**************************************************************************
//创建Eth的账号
//**************************************************************************
http_server.post("/CreateEthAccountReq", function (req, res) {
	var recvData = '';     
	req.on('data', function(chunk){recvData += chunk;});
	req.on('end', function(){    
		var recvMsg = JSON.parse(recvData);
		fw_log.debug("收到HTTP请求-创建ETH的账号->: " + JSON.stringify(recvMsg));
		var AckData = {
			Code: 0,
			Msg: "success",
		}
		res.send(JSON.stringify(AckData));
	});
});

