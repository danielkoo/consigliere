var AWS = require('aws-sdk');
var mAccounts = require('../models/accounts');
var config = require('config');
var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
      new (winston.transports.Console)({'timestamp':true})
    ]
});

var Auth = {};

/*
This method is given an account object as input and is returned an authenticated AWS Support object
or an error object if the authentication fails
*/
Auth.getSupport = function(account,callback){
  switch(account.type){
    case 'master':
      switch(account.choice){
        case 'role':
          var support = new AWS.Support({region:config.Defaults.AWS.Support.Region});
          logger.info("Lib/Auth | Returning Support object for Master Account using current instance role");
          callback(null,support);
        break;
        case 'keys':
          AWS.config.update({accessKeyId:account.accessKey,secretAccessKey:account.accessSecret});
          var support = new AWS.Support({region:config.Defaults.AWS.Support.Region});
          logger.info("Lib/Auth | Returning Support object for Master Account using configured Access Keys");
          callback(null,support);
        break;
      }
      break;
    case 'slave':
      switch(account.choice){
        case 'role':
          mAccounts.scan('type').eq('master').exec(function(err,masterAccounts){
            if(err){
              logger.error("Lib/Auth | Unable to perform scan operation for Accounts to find master | "+err.toString());
              callback(err);
            }
            else {
              if(masterAccounts.length > 0)
              {
                var masterAccount = masterAccounts[0];
                switch(masterAccount.choice){
                  case 'role':
                    var sts = new AWS.STS();
                    var params = {
                      RoleArn: account.roleArn,
                      RoleSessionName: 'consigliere'
                    }
                    sts.assumeRole(params,function(err,data){
                      if(err){
                        logger.error("Lib/Auth | Unable to assume role | "+err.toString());
                        callback(err);
                      }
                      else {
                        AWS.config.update({accessKeyId:data.Credentials.AccessKeyId,secretAccessKey:data.Credentials.SecretAccessKey,sessionToken:data.Credentials.SessionToken});
                        var support = new AWS.Support({region:config.Defaults.AWS.Support.Region});
                        logger.info("Lib/Auth | Returning Support object for Master:Role and Slave:Role");
                        callback(null,support);
                      }
                    });
                  break;
                  case 'keys':
                    AWS.config.update({accessKeyId:masterAccount.accessKey,secretAccessKey:masterAccount.accessSecret});
                    var sts = new AWS.STS();
                    var params = {
                      RoleArn: account.roleArn,
                      RoleSessionName: 'consigliere'
                    }
                    sts.assumeRole(params,function(err,data){
                      if(err){
                        logger.error("Lib/Auth | Unable to assume role | "+err.toString());
                        callback(err);
                      }
                      else {
                        AWS.config.update({accessKeyId:data.Credentials.AccessKeyId,secretAccessKey:data.Credentials.SecretAccessKey,sessionToken:data.Credentials.SessionToken});
                        var support = new AWS.Support({region:config.Defaults.AWS.Support.Region});
                        logger.info("Lib/Auth | Returning Support object for Master:Keys and Slave:Role");
                        callback(null,support);
                      }
                    });
                  break;
                }
              }
              else {
                logger.error("Lib/Auth | No Master account found");
              }
            }
          });
        break;
        case 'keys':
          AWS.config.update({accessKeyId:account.accessKey,secretAccessKey:account.accessSecret});
          var support = new AWS.Support({region:config.Defaults.AWS.Support.Region});
          logger.info("Lib/Auth | Returning Support object for Slave:Keys, master irrelevant");
          callback(null,support);
        break;
      }
      break;
  }
}

module.exports = Auth;
