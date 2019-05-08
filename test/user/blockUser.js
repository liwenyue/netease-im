/**
 * Created by henryleu on 9/6/16.
 */
const assert = require('chai').assert;
const nim = require('../sdk');
const fixture = require('../fixture');
const codeDefs = require('../../lib/codeDefs');

describe('blockUser', function(){

    describe('block a unblocked user', function(){

        before(function(done){
            const coconut = fixture.userCoconut;
            const form = {
                accid: coconut.id
            };
            nim.unblockUser(form, function(err, result){
                err && console.error(err);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                done();
            });
        });

        it('Succeed to block a unblocked user', function(done){
            const coconut = fixture.userCoconut;
            const form = {
                accid: coconut.id,
                needkick: false
            };
            nim.blockUser(form, function(err, result){
                err && console.error(err);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                done();
            });
        });

    });

    describe('repeat to block a blocked user', function(){

        before(function(done){
            const coconut = fixture.userCoconut;
            const form = {
                accid: coconut.id,
                needkick: true
            };
            nim.blockUser(form, function(err, result){
                err && console.error(err);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                done();
            });
        });

        it('Succeed to block a blocked user', function(done){
            const coconut = fixture.userCoconut;
            const form = {
                accid: coconut.id,
                needkick: false
            };
            nim.blockUser(form, function(err, result){
                err && console.error(err);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                done();
            });
        });

    });

});