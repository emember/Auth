function execute(action, para, callback){
	switch(action){
		case constants.VALIDATE:
			validate(para, callback);
			break;
		case constants.CREATE:
			create(para, callback);
			break;
		case constants.ACTIVATE:
			activate(para, callback);
			break;
	}
}

function validate(para, callback){
	var query ="match (c:company {companyId:{companyId}})\
	match (c) -[r:hasAppUser]->(u:appUser {appId:{appId}, appKey:{appKey}}) \
	return count(u)>0";

	console.log(para);

    db.cypherQuery(query, para, function (err, result){
    	callback(err, err?{}:result.data[0]);
    });
}


function create(para){
	para.companyId=constants.COMPANY_ID;	
	var query="match (c:company {companyId:{companyId}}) \
				create(c)-[r:hasAppUser]->(u:appUser) \
				set u.email={email}, u.appId='12345', u.appKey='abcde', u.activationCode='1a2b3c' \
				return u";

	dataQFitting.publish(constants.DATABASE, JSON.stringify({ticket:para.token+para.action, query:query, para:para}));		

}

function activate(para){
	para.companyId=constants.COMPANY_ID;

	var query ="match (c:company {companyId:{companyId}})\
	match (c) -[r:hasAppUser]->(u:appUser {activationCode:{activationCode}}) \
	set u.token={token} \
	return {appId:u.appId, appKey:u.appKey}";

	dataQFitting.publish(constants.DATABASE, JSON.stringify({ticket:para.token+para.action, query:query, para:para}));				
}

module.exports = {
	execute:execute
};
