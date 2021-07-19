var http 			= require("http");
var https 			= require("https");
var querystring 	= require("querystring");


//**************************************************************************
//http请求的处理 get
//**************************************************************************
exports.get = function (host, port, path, data, safe, callback) {
	var content = querystring.stringify(data);  
	var options = {  
		hostname: host,  
		path: path + "?" + content,  
		method:"GET",
		headers: {
			'Content-Type':'application/x-www-form-urlencoded',
		}
	};
	if(port){
		options.port = port;
	}
	var proto = http;
	if(safe){
		proto = https;
	}
	var req = proto.request(options, function (res) {  
		res.setEncoding("utf8");  
		var recvData = '';     
		res.on("data", function(chunk){recvData += chunk;});
		res.on("end", function(){   
			var recvMsg = JSON.parse(recvData);
			callback(true, recvMsg);
		}); 
	});	  
	req.on("error", function (e) {  
		fw_log.error("服务器http请求发生错误: " + e.message);
		callback(false, e);
	});  
	req.end(); 
};


//**************************************************************************
//http请求的处理 post
//**************************************************************************
exports.post = function (host, port, path, data, safe, callback) {
    var contentJson = JSON.stringify(data);
	var options = {  
		hostname: host,  
		path: path,  
		method:"POST",
		headers: {
			'Content-Type':'application/json;charset=UTF-8',
		}
	};
	if(port){
		options.port = port;
	}
	var proto = http;
	if(safe){
		proto = https;
	}
	var req = proto.request(options, function (res) {  
		res.setEncoding("utf8");  
		var recvData = '';     
		res.on("data", function(chunk){recvData += chunk;});
		res.on("end", function(){   
			var recvMsg = JSON.parse(recvData);
			callback(true, recvMsg);
		}); 
	});	  
	req.on("error", function (e) {  
		fw_log.error("服务器http请求发生错误: " + e.message);
		callback(false, e);
	});  
	req.write(contentJson);
	req.end(); 
};