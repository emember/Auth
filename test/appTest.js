var app = require('../app');

function handleResult(err, result){
    if(err){
	    console.log(err);
    }else{
    	console.log(result);
    }
}

var appUser={companyId:'f4035320-be1f-4e71-8005-2363a6f074ee', appId:'5321', appKey:'edba'};
app.validateAppUser(appUser, handleResult);