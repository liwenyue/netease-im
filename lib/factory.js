/**
 * Created by henryleu on 9/6/16.
 */
const assert = require('assert');
const newApiRequest = require('./impl');

const generateApiFunc = function(api){
    const apiFunc = function(form, callback){
        const req = newApiRequest(api.endpoint, api.name, this._o);
        req(form, callback);
    };
    apiFunc.name = api.name;
    apiFunc.endpoint = api.endpoint;
    return apiFunc;
};

module.exports = function(sdkConstructor, apiList){
    assert(sdkConstructor instanceof Function, 'sdk constructor should be a function');
    assert(Array.isArray(apiList), 'apiList should be an array ');
    apiList.forEach(api=> {
        sdkConstructor.prototype[api.name] = generateApiFunc(api);
    })
};