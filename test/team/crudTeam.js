/**
 * Created by henryleu on 9/6/16.
 */
const assert = require('chai').assert;
const co = require('co');
const nim = require('../sdk');
const fixture = require('../fixture');
const Nim = require('../../lib');
const codeDefs = require('../../lib/codeDefs');

const inviteeApproveMode = Nim.inviteeApproveMode;
const joinMode = Nim.joinMode;
const inviteeMode = Nim.inviteeMode;
const inviterMode = Nim.inviterMode;
const updateMode = Nim.updateMode;
const updateCustomMode = Nim.updateCustomMode;
const queryFlag = Nim.queryFlag;


describe('crudTeam', function(){

    it('create read update and delete a team', function(done){
        const apple = fixture.userApple;
        const banana = fixture.userBanana;
        const coconut = fixture.userCoconut;
        const durian = fixture.userDurian;
        let result = null;
        let tid = null;
        let teams = null;

        co(function*(){
            try{
                //create a team
                const createForm = {
                    owner: apple.id
                    , members: JSON.stringify([banana.id, coconut.id, durian.id])
                    , msg: '好久没聚了, 赶紧来吧'
                    , tname: '周末去撸串啊!'
                    , magree: inviteeApproveMode.no
                    , joinmode: joinMode.withoutApproving
                    , beinvitemode: inviteeMode.withoutApproving
                    , invitemode: inviterMode.admin
                    , uptinfomode: updateMode.admin
                    , upcustommode: updateCustomMode.admin

                };
                result = yield nim.createTeamAsync(createForm);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                tid = result.tid;

                //query created team
                const queryForm = {
                    tids: JSON.stringify([tid]),
                    ope:  queryFlag.withMembers
                };
                result = yield nim.queryTeamsAsync(queryForm);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                teams = result.tinfos;
                assert.equal(teams[0].tname, createForm.tname);

                //update a team
                const updateForm = {
                    tid: tid
                    , owner: apple.id
                    , tname: '周末去撸串啊! - updated'
                    , joinmode: joinMode.withoutApproving
                    , beinvitemode: inviteeMode.withoutApproving
                    , invitemode: inviterMode.admin
                    , uptinfomode: updateMode.admin
                    , upcustommode: updateCustomMode.admin

                };
                result = yield nim.updateTeamAsync(updateForm);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);

                //query updated team
                queryForm = {
                    tids: JSON.stringify([tid]),
                    ope:  queryFlag.withMembers
                };
                result = yield nim.queryTeamsAsync(queryForm);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                teams = result.tinfos;
                assert.equal(teams[0].tname, updateForm.tname);

                //delete the team
                deleteForm = {
                    tid: tid
                    , owner: apple.id
                };
                result = yield nim.deleteTeamAsync(deleteForm);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);

                //query deleted team
                queryForm = {
                    tids: JSON.stringify([tid]),
                    ope:  queryFlag.withMembers
                };
                result = yield nim.queryTeamsAsync(queryForm);
                console.info(result);
                assert.equal(result.code, codeDefs.WRONG_PARAMETERS.code);

                done();
            }
            catch(e){
                console.error(err);
                assert.ok(false);
            }
        });

    });

});