const AWS = require("../awsConfig");
const dynamoDbTables = {};

//add all tables to this object
dynamoDbTables.usersTable = require("./tablesConfig/usersTableConfig");

const dynamoDb = new AWS.DynamoDB();

dynamoDb.listTables((err, listOfExistingTables) => {
  Object.keys(dynamoDbTables).forEach((key) => {
    if (
      !listOfExistingTables.TableNames.includes(dynamoDbTables[key].TableName)
    ) {
      console.log(
        listOfExistingTables.TableNames.includes(dynamoDbTables[key])
      );
      dynamoDb.createTable(dynamoDbTables[key], (err, data) => {
        if (err) {
          console.error(
            "Unable to create table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log(
            "Created table. Table description JSON:",
            JSON.stringify(data, null, 2)
          );
        }
      });
    }
  });
});
