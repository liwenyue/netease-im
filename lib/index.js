const assert = require('assert');
const build = require('./factory');
const user = require('./user');
const msg = require('./msg');
const team = require('./team');
const chatroom = require('./chatroom');
const history = require('./history');

const Sdk = function(options){
    this._o = options || {};
    assert(this._o.appsecret, 'need nim app secret');
    assert(this._o.appkey,    'need nim app key');
    assert(this._o.logger,    'need logger');
};

build(Sdk, user.apis);
build(Sdk, msg.apis);
build(Sdk, team.apis);
build(Sdk, history.apis);
build(Sdk, chatroom.apis);

Object.assign(Sdk, user.types);
Object.assign(Sdk, msg.types);
Object.assign(Sdk, team.types);

module.exports = Sdk;