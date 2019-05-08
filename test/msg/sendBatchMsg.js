/**
 * Created by henryleu on 9/6/16.
 */
const assert = require('chai').assert;
const nim = require('../sdk');
const fixture = require('../fixture');
const Nim = require('../../lib');
const codeDefs = require('../../lib/codeDefs');

const msgTypes = Nim.msgTypes;
const msgOptions = Nim.msgOptions;

describe('sendBatchMsg', function(){

    describe('text', function(){
        const apple = fixture.userApple;
        const banana = fixture.userBanana;
        const coconut = fixture.userCoconut;
        const durian = fixture.userDurian;

        it('send text to list of users', function(done){
            const form = {
                fromAccid:  apple.id,
                toAccids:   JSON.stringify([banana.id, coconut.id, durian.id]),
                type:       msgTypes.text,
                body:       JSON.stringify({msg: '你好!'}),
                option:     JSON.stringify(msgOptions)
            };

            nim.sendBatchMsg(form, function(err, result){
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
        const coconut = fixture.userCoconut;
        const durian = fixture.userDurian;

        it('send location to individual', function(done){
            const form = {
                fromAccid:  apple.id,
                toAccids:   JSON.stringify([banana.id, coconut.id, durian.id]),
                type:       msgTypes.location,
                body:   JSON.stringify({
                    "title": "中国 浙江省 杭州市 网商路 599号",
                    "lng": 120.1908686708565,
                    "lat": 30.18704515647036
                }),
                option:     JSON.stringify(msgOptions)
            };

            nim.sendBatchMsg(form, function(err, result){
                err && console.error(err);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                done();
            });
        });
    });
});