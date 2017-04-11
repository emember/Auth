/**
    handle login call to get mqtt connection token
 **/

const neo4j = require('node-neo4j');
global.constants=require('./constants');
global.config =require('./config');
global.util=require('./util');

global.db=new neo4j(config.neo4jServer, config.neo4jKey); 

var appUser= require('appUser');

exports.handler = (event, context, callback) => {

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log('~~~~lalalal~~~~');

    appUser.execute(constants.VALIDATE, JSON.parse(event.body), done);
};
