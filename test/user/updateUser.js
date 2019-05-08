/**
 * Created by henryleu on 9/6/16.
 */
const assert = require('chai').assert;
const nim = require('../sdk');
const fixture = require('../fixture');
const codeDefs = require('../../lib/codeDefs');

describe('updateUser', function(){

    it('Succeed to update a user', function(done){
        const apple = fixture.userApple;
        const form = {
            accid: apple.id,
            token: apple.token,
            props: JSON.stringify({type: 'test-updated'})
        };
        nim.updateUser(form, function(err, result){
            err && console.error(err);
            console.info(result);
            assert.equal(result.code, codeDefs.OK.code);
            done();
        });
    });

});