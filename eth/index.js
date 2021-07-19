//导入引用的库和配置
var config = require("./config");
var http_service = require("./http_service");

//引用工具类
fw_http = require("../framework/fw_http");
fw_log  = require("../framework/fw_log");
fw_util = require("../framework/fw_util");
trx_util = require("./trx_util");

//启动远端访问的http代码
fw_log.initLog("./logs/trx", "debug");
http_service.start(config);

//测试数据
//trx_util.getTrxBalance("TEhobA6Ub3fAtrJGwBnA3fZU4pQCTNz1gg");
//trx_util.getUSDTBalance("3F9754FF35A7A7EE768CAA4DCE8895F78C80E8A91633911491EA9310A6F04029", "TEhobA6Ub3fAtrJGwBnA3fZU4pQCTNz1gg");
//trx_util.createNewAccount();
//trx_util.sendTransactionUSDT("a40233681a0837e99ec48351ba3c63bc042107aa760519111f49b43be3b3e04f", "TWpYnsUYSAajQ7oSimeFVTi4JNyyk6bR5F", 1);
//trx_util.sendTransactionTRX("a40233681a0837e99ec48351ba3c63bc042107aa760519111f49b43be3b3e04f", "TWpYnsUYSAajQ7oSimeFVTi4JNyyk6bR5F", 1);

//启动一个全局异常捕获/防止崩溃
process.on("uncaughtException", function (err) {
    console.log("======================捕获到全局错误异常start=========================");
    console.log(err.stack);
    console.log("======================捕获到全局错误异常end===========================");
});