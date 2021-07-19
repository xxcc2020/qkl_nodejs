//导入引用的库和配置
CONFIG = require("./config");
fw_http = require("../framework/fw_http");
fw_log = require("../framework/fw_log");
fw_util = require("../framework/fw_util");
//http服务器
var http_service = require("./http_service");

//初始化日志工具
fw_log.initLog("./logs/eth", "debug");

//启动远端访问的http代码
http_service.start();

//启动一个全局异常捕获/防止崩溃
process.on("uncaughtException", function (err) {
    console.log("======================捕获到全局错误异常start=========================");
    console.log(err.stack);
    console.log("======================捕获到全局错误异常end===========================");
});