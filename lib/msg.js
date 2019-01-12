/**
 * Created by henryleu on 9/6/16.
 */
const ApiDef = require('./api');
const apiBaseUrl = 'https://api.netease.im/nimserver/msg';
const apis = [];
const types = {};

const msgApis = {
    sendMsg: 'sendMsg',
    sendBatchMsg: 'sendBatchMsg',
    sendAttachMsg: 'sendAttachMsg',
    sendBatchAttachMsg: 'sendBatchAttachMsg'
}


for (let key of Object.keys(msgApis)) {
    apis.push(new ApiDef(key,  `${apiBaseUrl}/${msgApis[key]}.action`))
}

// const api = new ApiDef('sendMsg',  apiBaseUrl + '/sendMsg.action');
// apis.push(api);

// api = new ApiDef('sendBatchMsg',  apiBaseUrl + '/sendBatchMsg.action');
// apis.push(api);

// api = new ApiDef('sendAttachMsg',  apiBaseUrl + '/sendAttachMsg.action');
// apis.push(api);

// api = new ApiDef('sendBatchAttachMsg',  apiBaseUrl + '/sendBatchAttachMsg.action');
// apis.push(api);


types.msgOptions = {
    "push":         false,
    "roam":         true, 
    "history":      false,
    "sendersync":   true,
    "route":        false,
    "badge":        false,
    "needPushNick": true
};


types.msgTypes = {
    text:       0   //表示文本消息
    , image:    1   //表示图片
    , voice:    2   //表示语音
    , video:    3   //表示视频
    , location: 4   //表示地理位置信息
    , file:     6   //表示文件
    , custom: 100   //自定义消息类型
};

types.targetTypes = {
    individual: 0   //表示个体
    , group:    1   //表示群组
};

types.saveModes = {
    online:     1   //表示: 只发在线
    , offline:  2   //表示: 会存离线
};

module.exports = { apis: apis, types: types };