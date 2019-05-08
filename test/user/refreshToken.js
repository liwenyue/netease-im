/**
 * Created by henryleu on 9/6/16.
 */
const assert = require('chai').assert;
const nim = require('../sdk');
const fixture = require('../fixture');
const codeDefs = require('../../lib/codeDefs');

describe('refreshToken', function(){

    it('Succeed to refresh a user\'s token', function(done){
        const durian = fixture.userDurian;
        const form = {
            accid: durian.id
        };
        nim.refreshToken(form, function(err, result){
            err && console.error(err);
            console.info(result);
            assert.equal(result.code, codeDefs.OK.code);
            done();
        });
    });

});