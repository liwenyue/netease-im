/**
 * Created by henryleu on 9/6/16.
 */
const ApiDef = require('./api');
const apis = [];
const apiBaseUrl = 'https://api.netease.im/nimserver/chatroom';

const chatroomApis = {
  createRoom: 'create',
  getRoom: 'get',
  updateRoom: 'update',
  muteRoom: 'muteRoom',
  toggleRoomStat: 'toggleCloseStat',
  setMemberRole: 'setMemberRole',
  requestAddress: 'requestAddr',
  sendMessage: 'sendMsg',
  addRobot: 'addRobot',
  removeRobot: 'removeRobot',
  temporaryMute: 'temporaryMute',
  queueOffer: 'queueOffer',
  queuePoll: 'queuePoll',
  queueList: 'queueList',
  queueDrop: 'queueDrop',
  queueInit: 'queueInit',
  getTopNumber: 'topn',
  paginateRoomMembers: 'membersByPage',
  getRoomMembers: 'queryMembers',
  updateMemberRoomRole: 'updateMyRoomRole',
}

for (let key of Object.keys(chatroomApis)) {
  apis.push(new ApiDef(key,  `${apiBaseUrl}/${chatroomApis[key]}.action`))
}

const types = {};

module.exports = { apis: apis, types: types };;