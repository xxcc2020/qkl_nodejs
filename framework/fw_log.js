//引用日志库
var log4js = require("log4js");

//日志启动的配置相关
var logconsole = true;
var logger = null;

//**************************************************************************
//外部调用的初始化日志的方法
//**************************************************************************
exports.initLog = function(filename, loglevel){
    log4js.configure({
        appenders: { 
            loggername: { 
                type: "dateFile", 
                filename: filename,
                pattern: "yyyy-MM-dd.log",
                maxLogSize: 1024*1024*20,
                alwaysIncludePattern: true
            } 
        },
        categories: { default: { appenders: ["loggername"], level: loglevel } }
    });
    
    logger = log4js.getLogger("-");
};

//**************************************************************************
//对应日志级别的方法
//**************************************************************************

exports.debug = function(logdata){
    if(logconsole){
        console.log(logdata)
    }
    if(logger){
        logger.debug(logdata);
    }
};

exports.info = function(logdata){
    if(logconsole){
        console.log(logdata)
    }
    if(logger){
        logger.info(logdata);
    }
};

exports.warn = function(logdata){
    if(logconsole){
        console.log(logdata)
    }
    if(logger){
        logger.warn(logdata);
    }
};

exports.error = function(logdata){
    if(logconsole){
        console.log(logdata)
    }
    if(logger){
        logger.error(logdata);
    }
};

exports.fatal = function(logdata){
    if(logconsole){
        console.log(logdata)
    }
    if(logger){
        logger.fatal(logdata);
    }
};