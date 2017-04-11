function execute(action, para){
	switch(action){
		case constants.CREATE:
			create(para);
			break;
		case constants.VALIDATE:
			validate(para);
			break;
		case constants.ACTIVATE:
			activate(para);
			break;
	}
}



function create(para){
	para.companyId=constants.COMPANY_ID;	
	var query="match (c:company {companyId:{companyId}}) \
				create(c)-[r:hasAppUser]->(u:appUser) \
				set u.email={email}, u.appId='12345', u.appKey='abcde', u.activationCode='1a2b3c' \
				return u";

	dataQFitting.publish(constants.DATABASE, JSON.stringify({ticket:para.token+para.action, query:query, para:para}));		

}

function validate(para){
	para.companyId=constants.COMPANY_ID;

	var query ="match (c:company {companyId:{companyId}})\
	match (c) -[r:hasAppUser]->(u:appUser {appId:{appId}, appKey:{appKey}}) \
	set u.token={token} \
	return count(u)>0";

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
