var moment = require('moment');

function getLevelNTopic(topic, n){
	var levels = topic.split('/');
	return levels[n];
}

function log(msg){
	if(constants.DEBUG){
		console.log('~~authentication~~~'+moment().format(),msg);
	}
}

module.exports={
	getLevelNTopic:getLevelNTopic,
	log:log
}