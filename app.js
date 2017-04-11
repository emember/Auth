/**
    handle login call to get mqtt connection token
 **/

const neo4j = require('node-neo4j');
global.constants=require('./constants');
global.config =require('./config');
global.util=require('./util');

const db=new neo4j(config.neo4jServer, config.neo4jKey); 

function validateAppUser(para, handleResult){
    var query ="match (c:company {companyId:{companyId}})\
    match (c) -[r:hasAppUser]->(u:appUser {appId:{appId}, appKey:{appKey}}) \
    return count(u)>0";

    var res='123';

    db.cypherQuery(
        query,
        para,
        function (err, result) {
            if (err) {
                handleResult(err);
            }else{
                handleResult(null, result.data);
            }
        }); 
}
exports.validateAppUser= validateAppUser;    

exports.handler = (event, context, callback) => {

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    validateAppUser(event.body, done);
};
