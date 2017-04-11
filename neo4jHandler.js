var neo4j = require('node-neo4j');
var db = new neo4j(config.neo4jServer, config.neo4jKey);

function execute(req){
	util.log(req);
	
	db.cypherQuery(
		req.query,
		req.para,
		function (err, result) {
			if (err) {
				util.log(err);
			}else{
				util.log(result.data);	
				mqttClient.publish(req.ticket, JSON.stringify(result.data));
			}			
		});	
}

module.exports={
	execute:execute
}