/**
 * Created by henryleu on 9/6/16.
 */
const assert = require('chai').assert;
const nim = require('../sdk');
const fixture = require('../fixture');
const Nim = require('../../lib');
const codeDefs = require('../../lib/codeDefs');

const targetTypes = Nim.targetTypes;
const saveModes = Nim.saveModes;
const msgOptions = Nim.msgOptions;

describe('sendAttachMsg', function(){

    describe('text', function(){
        const apple = fixture.userApple;
        const banana = fixture.userBanana;

        it('send text to individual', function(done){
            const form = {
                from:   apple.id,
                to:     banana.id,
                msgtype:targetTypes.individual,
                save:   saveModes.offline,
                attach:   JSON.stringify({msg: '你好!'})
            };

            nim.sendAttachMsg(form, function(err, result){
                err && console.error(err);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                done();
            });
        });
    });

});