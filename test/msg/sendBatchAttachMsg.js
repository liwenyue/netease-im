/**
 * Created by henryleu on 9/6/16.
 */
const assert = require('chai').assert;
const nim = require('../sdk');
const fixture = require('../fixture');
const Nim = require('../../lib');
const codeDefs = require('../../lib/codeDefs');

const saveModes = Nim.saveModes;
const msgOptions = Nim.msgOptions;

describe('sendBatchAttachMsg', function(){

    describe('text', function(){
        const apple = fixture.userApple;
        const banana = fixture.userBanana;
        const coconut = fixture.userCoconut;
        const durian = fixture.userDurian;

        it('send text to list of users', function(done){
            const form = {
                fromAccid:  apple.id,
                toAccids:   JSON.stringify([banana.id, coconut.id, durian.id]),
                save:       saveModes.offline,
                attach:     JSON.stringify({msg: '你好!'}),
                option:     JSON.stringify(msgOptions)
            };

            nim.sendBatchAttachMsg(form, function(err, result){
                err && console.error(err);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                done();
            });
        });
    });

});