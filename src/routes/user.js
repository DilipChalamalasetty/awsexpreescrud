const router=require('express').Router();
const AWS=require('../aws/awsConfig');
const AwsCrud=require('../utils/AwsCrud');
const awsCrudInstance=new AwsCrud(AWS)

//importing required tables 
const usersTableConfig=require('../aws/dynamoDb/tablesConfig/usersTableConfig');

const docClient=new AWS.DynamoDB.DocumentClient();

router.post('/adduser',(req,res,next)=>{
    let params = {
        TableName:usersTableConfig.TableName,
        Item:{
            "gmail":req.body.gmail,
            ...req.body
        }
    };
    awsCrudInstance.add(params,req,res,next);
})

router.get('/getuser/:gmail',(req,res,next)=>{
    let params = {
        TableName:usersTableConfig.TableName, 
        Key:{
            "gmail":req.params.gmail,
        }
    }; 
    awsCrudInstance.get(params,req,res,next);
})

router.put('/updateuser',(req,res,next)=>{
    let params = {
        TableName:usersTableConfig.TableName,
        Key:{
            "gmail":req.body.gmail, 
        },
        ReturnValues:"UPDATED_NEW"
    };
    awsCrudInstance.updateExpressionGenaration(params,req,res,next);
    console.log(params);
    awsCrudInstance.update(params,req,res,next);
    
})

router.delete('/deleteuser/:gmail',(req,res,next)=>{
    let params = {
        TableName:usersTableConfig.TableName,
        Key:{
            "gmail":req.params.gmail, 
        },
    };
    awsCrudInstance.delete(params,req,res,next);    
})

module.exports=router;