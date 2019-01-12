/**
 * Created by henryleu on 9/6/16.
 */
const ApiDef = require('./api');
const apis = [];
const apiBaseUrl = 'https://api.netease.im/nimserver/history';

const historyApis = {
  querySessionMessage: 'querySessionMsg',
  queryTeamMessage: 'queryTeamMsg',
  queryChatroomMessage: 'queryChatroomMsg',
  queryUserEvents: 'queryUserEvents',
  deleteMediaFile: 'deleteMediaFile',
}

for (let key of Object.keys(historyApis)) {
  apis.push(new ApiDef(key,  `${apiBaseUrl}/${historyApis[key]}.action`))
}

const types = {};

module.exports = { apis: apis, types: types };;