/**
 * Created by henryleu on 9/6/16.
 */
const assert = require('chai').assert;
const nim = require('../sdk');
const fixture = require('../fixture');
const Nim = require('../../lib');
const codeDefs = require('../../lib/codeDefs');

const msgTypes = Nim.msgTypes;
const targetTypes = Nim.targetTypes;
const msgOptions = Nim.msgOptions;

describe('sendMsg', function(){

    describe('text', function(){
        const apple = fixture.userApple;
        const banana = fixture.userBanana;

        it('send text to individual', function(done){
            const form = {
                from:   apple.id,
                to:     banana.id,
                ope:    targetTypes.individual,
                type:   msgTypes.text,
                body:   JSON.stringify({msg: '你好!'}),
                option:   JSON.stringify(msgOptions)
            };

            nim.sendMsg(form, function(err, result){
                err && console.error(err);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                done();
            });
        });
    });

    describe('location', function(){
        const apple = fixture.userApple;
        const banana = fixture.userBanana;

        it('send location to individual', function(done){
            const form = {
                from:   apple.id,
                to:     banana.id,
                ope:    targetTypes.individual,
                type:   msgTypes.location,
                body:   JSON.stringify({
                    "title": "中国 浙江省 杭州市 网商路 599号",
                    "lng": 120.1908686708565,
                    "lat": 30.18704515647036
                }),
                option: JSON.stringify(msgOptions)
            };

            nim.sendMsg(form, function(err, result){
                err && console.error(err);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                done();
            });
        });
    });
});