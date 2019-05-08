/**
 * Created by henryleu on 9/6/16.
 */
const assert = require('chai').assert;
const nim = require('../sdk');
const codeDefs = require('../../lib/codeDefs');

describe('createUser', function(){

    describe('Succeed to create a user', function(){
        // const accid = 'test-' + new Date().getTime();
        const accid = 'test-001';
        const name = accid;
        const token = 'a6ee36aa0d0856897ee96c0c13b15b83';

        it('Create a brand new user', function(done){
            const user = {
                accid: accid,
                name: name,
                props: JSON.stringify({type: 'test'}),
                icon: 'http://wx.qlogo.cn/mmopen/CyYbk1vmHvYCTpBHH4UiblcOM6IEMibm2VweVnbTm5tnWib1rQG5v6t7779AEnDSkFf212MXOVXX29JvZlKicjhUxjpRYDnTPTES/0'
            };
            nim.createUser(user, function(err, result){
                err && console.error(err);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                done();
            });
        });
    });

    describe('Fail to create an existed user', function(){
        const accid = 'test-002';
        const name = accid;
        const token = '5a0e469207f4bb1da92903cd808f35f3';

        before(function(done){
            const user = {
                accid: accid,
                name: name,
                props: JSON.stringify({type: 'test'}),
                icon: 'http://wx.qlogo.cn/mmopen/CyYbk1vmHvYCTpBHH4UiblcOM6IEMibm2VweVnbTm5tnWib1rQG5v6t7779AEnDSkFf212MXOVXX29JvZlKicjhUxjpRYDnTPTES/0'
            };
            nim.createUser(user, function(err, result){
                err && console.error(err);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                done();
            });
        });

        it('Fail with user error', function(done){
            const user = {
                accid: accid,
                name: name,
                props: JSON.stringify({type: 'test'}),
                icon: 'http://wx.qlogo.cn/mmopen/CyYbk1vmHvYCTpBHH4UiblcOM6IEMibm2VweVnbTm5tnWib1rQG5v6t7779AEnDSkFf212MXOVXX29JvZlKicjhUxjpRYDnTPTES/0'
            };
            nim.createUser(user, function(err, result){
                err && console.error(err);
                console.info(result);
                assert.equal(result.code, codeDefs.EXISTED_USER.code);
                done();
            });
        });
    });
});