'use strict'
const dialogFlow=require('dialogflow');
const structjson=require('./structjson');
const config=require('../config/keys');
const sessionClient=new dialogFlow.SessionsClient();
const sessionPath=sessionClient.sessionPath(config.googleProjectID,config.dialogFlowSessionID);
module.exports={
    textQuery:async function(text, parameters={}){
        let self = module.exports;
         const request={
        session:sessionPath,
        queryInput:{
            text:{
                text:text,
                languageCode:config.dialogFlowSessionLanguageCode,
            },
        },
        queryParams:{
            payload:{
                data:parameters
            }
        }
    };
        let responses = await sessionClient
            .detectIntent(request);
        responses=await self.handleAction(responses);
        return responses;
    },
    
     eventQuery: async function(event, parameters = {}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
                    languageCode:config.dialogFlowSessionLanguageCode,
                },
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },
    handleAction: function(responses){
        return responses;
    }

}