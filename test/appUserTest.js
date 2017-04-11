const neo4j = require('node-neo4j');
global.constants=require('../constants');
global.config =require('../config');

global.db=new neo4j(config.neo4jServer, config.neo4jKey); 


function handleResult(err, result){
    if(err){
	    console.log(err);
    }else{
    	console.log(result);
    }
}


var appUser= require('../appUser');

var appUserObj={'companyId':'f4035320-be1f-4e71-8005-2363a6f074ee', 'appId':'5321', 'appKey':'edba'};
appUser.execute(constants.VALIDATE, appUserObj, handleResult);