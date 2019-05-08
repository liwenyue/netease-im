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


describe('addAndRemoveMember', function(){
    const apple = fixture.userApple;
    const banana = fixture.userBanana;
    const coconut = fixture.userCoconut;
    const durian = fixture.userDurian;
    let tid = null;

    before(function(done){
        let result = null;
        co(function*(){
            try{
                //create a team
                const createForm = {
                    owner: apple.id
                    , members: JSON.stringify([apple.id, durian.id])
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

                done();
            }
            catch(e){
                console.error(err);
                assert.ok(false);
            }
        });
    });

    after(function(done){
        let result = null;
        co(function*(){
            try{
                //delete the team
                deleteForm = {
                    tid: tid
                    , owner: apple.id
                };
                result = yield nim.deleteTeamAsync(deleteForm);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);

                done();
            }
            catch(e){
                console.error(err);
                assert.ok(false);
            }
        });
    });

    it('add a, remove a, add a again, and remove a again', function(done){
        let result = null;
        let form = null;
        let queryForm = null;

        co(function*(){
            try{

                //query the team
                queryForm = {
                    tids: JSON.stringify([tid]),
                    ope:  queryFlag.withMembers
                };
                result = yield nim.queryTeamsAsync(queryForm);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                teams = result.tinfos;
                console.info(teams[0]);
                assert.deepEqual(teams[0].members, [durian.id]);

                //add a team member
                form = {
                    tid: tid
                    , owner: apple.id
                    , members: JSON.stringify([banana.id])
                    , msg: '邀请你参加局 - 周末去撸串啊!'
                    , magree: inviteeApproveMode.no
                    , attach: JSON.stringify({type: 'private'})
                };
                result = yield nim.addTeamMemberAsync(form);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);

                //query the team
                queryForm = {
                    tids: JSON.stringify([tid]),
                    ope:  queryFlag.withMembers
                };
                result = yield nim.queryTeamsAsync(queryForm);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                teams = result.tinfos;
                console.info(teams[0]);
                assert.deepEqual(teams[0].members, [durian.id, banana.id]);

                //remove a team member
                form = {
                    tid: tid
                    , owner: apple.id
                    , member: banana.id
                    , attach: JSON.stringify({type: 'public'})
                };
                result = yield nim.removeTeamMemberAsync(form);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);

                //query the team
                queryForm = {
                    tids: JSON.stringify([tid]),
                    ope:  queryFlag.withMembers
                };
                result = yield nim.queryTeamsAsync(queryForm);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                teams = result.tinfos;
                console.info(teams[0]);
                assert.deepEqual(teams[0].members, [durian.id]);

                //add a team member
                form = {
                    tid: tid
                    , owner: apple.id
                    , members: JSON.stringify([banana.id])
                    , msg: '邀请你参加局 - 周末去撸串啊!'
                    , magree: inviteeApproveMode.no
                    , attach: JSON.stringify({type: 'private'})
                };
                result = yield nim.addTeamMemberAsync(form);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);

                //query the team
                queryForm = {
                    tids: JSON.stringify([tid]),
                    ope:  queryFlag.withMembers
                };
                result = yield nim.queryTeamsAsync(queryForm);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                teams = result.tinfos;
                console.info(teams[0]);
                assert.deepEqual(teams[0].members, [durian.id, banana.id]);

                //remove a team member
                form = {
                    tid: tid
                    , owner: apple.id
                    , member: banana.id
                    , attach: JSON.stringify({type: 'public'})
                };
                result = yield nim.removeTeamMemberAsync(form);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);

                //query the team
                queryForm = {
                    tids: JSON.stringify([tid]),
                    ope:  queryFlag.withMembers
                };
                result = yield nim.queryTeamsAsync(queryForm);
                console.info(result);
                assert.equal(result.code, codeDefs.OK.code);
                teams = result.tinfos;
                console.info(teams[0]);
                assert.deepEqual(teams[0].members, [durian.id]);

                done();
            }
            catch(e){
                console.error(err);
                assert.ok(false);
            }
        });

    });

});