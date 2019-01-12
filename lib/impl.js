/**
 * Created by henryleu on 9/6/16.
 */
const request = require('request');
const crypto = require('crypto');
const nimCodes = require('./codes');

const INFRASTRUCTURE_ERROR = {
    code: 190, desc: '[云信API基础设施错误] - '
};

const PARSE_ERROR = {
    code: 191, desc: '[云信API响应解析错误] - '
};

const genNonce = function(len) {
    return crypto.randomBytes(len).toString('hex');
};

const genChecksum = function(appsecret, nonce, curtime){
    const raw = appsecret + nonce + curtime;
    const hasher = crypto.createHash("sha1");
    return hasher.update(raw).digest('hex');
};

const getHeaders = function(appsecret, appkey){
    const nonce = genNonce(64);
    const curtime = Math.floor(new Date().getTime()/1000);
    const checksum = genChecksum(appsecret, nonce, curtime);
    return {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'AppKey': appkey,
        Nonce: nonce,
        CurTime: curtime,
        CheckSum: checksum
    };
};

const postProcessResponse = function(err, body){
    let result = null;

    if(err){
        result = { code: INFRASTRUCTURE_ERROR.code,  desc: INFRASTRUCTURE_ERROR.desc + err };
    }
    else{
        try{
            result = JSON.parse(body);
            if(result.code!=200){
                const errmsg = nimCodes[''+result.code];
                errmsg && (result.desc = '[' + errmsg + '] - ' + result.desc);
            }
        }
        catch(e){
            result = { code: PARSE_ERROR.code, desc: PARSE_ERROR.desc + e };
        }
    }

    return result;
};

module.exports = function(url, name, options){
    const logger      = options.logger;
    const appsecret   = options.appsecret;
    const appkey      = options.appkey;

    return function(form, callback){
        const headers = getHeaders(appsecret, appkey);

        //Log API input if enabled
        if(logger.isDebugEnabled()){
            logger.debug(name + ' -  input - ' + JSON.stringify(form));
        }

        request.post({url: url, form: form, headers: headers},
            function (err, response, body) {
                const result = postProcessResponse(err, body);

                //Log fatal error
                if(result.code == INFRASTRUCTURE_ERROR.code || result.code == PARSE_ERROR.code){
                    logger.error(name + ' - output - ' + JSON.stringify(result));
                }

                //Log API input if enabled
                if(logger.isDebugEnabled()){
                    logger.debug(name + ' - output - ' + JSON.stringify(result));
                }
                if (callback) callback(null, result);
            });
    };
};