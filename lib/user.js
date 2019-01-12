/**
 * Created by henryleu on 9/6/16.
 */
const ApiDef = require('./api');
const apiBaseUrl = 'https://api.netease.im/nimserver/user';
const apis = [];
const types = {};

const userApis = {
  createUser: 'create',
  updateUser: 'update',
  refreshToken: 'refreshToken',
  blockUser: 'block',
  unblockUser: 'unblock',
  updateUserInfo: 'updateUinfo',
  getUserInfos: 'getUinfos',
}

for (let key of Object.keys(userApis)) {
  apis.push(new ApiDef(key,  `${apiBaseUrl}/${userApis[key]}.action`))
}


module.exports = { apis: apis, types: types };