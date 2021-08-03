var usersTableConfig = {
    TableName : "Users",
    KeySchema: [       
        { AttributeName: "gmail", KeyType: "HASH"},
    ],
    AttributeDefinitions: [       
        { AttributeName: "gmail", AttributeType: "S" },   
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};



module.exports=usersTableConfig;