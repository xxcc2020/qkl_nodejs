var crypto = require("crypto");
var fs = require('fs'); 
var path = require('path'); 

//**************************************************************************
//扩展string类型的函数
//**************************************************************************
(function () {
    //引号转义符号
    String.EscapeChar = "\'";
    //**************************************************************************
    //替换所有字符串
    //**************************************************************************
    String.prototype.replaceAll = function (searchValue, replaceValue) {
        var regExp = new RegExp(searchValue, "g");
        return this.replace(regExp, replaceValue);
    }
    //**************************************************************************
    //扩展格式化字符串函数format
    //**************************************************************************
    String.prototype.format = function () {
        var regexp = /\{(\d+)\}/g;
        var args = arguments;
        var result = this.replace(regexp, function (m, i, o, n) {
            return args[i];
        });
        return result.replaceAll("%", String.EscapeChar);
    }
})();


//**************************************************************************
//获取远程IP地址
//**************************************************************************
exports.getClientIp = function(req){
    var remotAddress =  req.headers["x-forwarded-for"] ||
                        req.connection.remoteAddress ||
                        req.socket.remoteAddress ||
                        req.connection.socket.remoteAddress;
    remotAddress     = remotAddress.replace(/:/g, "");
    remotAddress     = remotAddress.replace(/f/g, "");
    return remotAddress;
};


//**************************************************************************
//MD5加密数据
//**************************************************************************
exports.md5 = function (content) {
	var md5 = crypto.createHash("md5");
	md5.update(content);
	return md5.digest("hex");	
}


//**************************************************************************
//读取路径信息
//**************************************************************************
function getStat(path){
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if(err){
                resolve(false);
            }else{
                resolve(stats);
            }
        })
    })
}


//**************************************************************************
//创建路径
//**************************************************************************
function mkdir(dir){
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if(err){
                resolve(false);
            }else{
                resolve(true);
            }
        })
    })
}


//**************************************************************************
//路径是否存在，不存在则创建
//**************************************************************************
async function dirExists(dir){
    let isExists = await getStat(dir);
    //如果该路径且不是文件，返回true
    if(isExists && isExists.isDirectory()){
        return true;
    }else if(isExists){ //如果该路径存在但是文件，返回false
        return false;
    }
    //如果该路径不存在
    let tempDir = path.parse(dir).dir; //拿到上级路径
    //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await dirExists(tempDir);
    let mkdirStatus;
    if(status){
        mkdirStatus = await mkdir(dir);
    }
    return mkdirStatus;
}


//**************************************************************************
//路径是否存在，不存在则创建
//**************************************************************************
exports.checkDirExists = function(dir){
    dirExists(dir);
}

