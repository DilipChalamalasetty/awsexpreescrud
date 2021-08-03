class AwsCrud {
  constructor(AWS) {
    this.AWS = AWS;
    this.docClient = new this.AWS.DynamoDB.DocumentClient();
  }
  add(params, req, res, next) {
    //wrap the add fucntion code
    this.docClient.put(params, (err, data) => {
      if (err) {
        next(err);
      } else {
        res.send(data);
      }
    });
  }

  get(params, req, res, next) {
    //wrap the get function code
    this.docClient.get(params, (err, data) => {
      if (err) {
        next(err);
      } else {
        res.send(data);
      }
    });
  }

  update(params, req, res, next) {
    //wrap the update function code
    this.docClient.update(params, function (err, data) {
      if (err) {
        next(err);
      } else {
        res.send(data);
      }
    });
  }

  delete(params, req, res, next) {
    //wrap the delete function code
    this.docClient.delete(params, function (err, data) {
      if (err) {
        next(err);
      } else {
        res.send(data);
      }
    });
  }

  updateExpressionGenaration(params, req, res, next) {
    try {
      let UpdateExpression = [];
      let ExpressionAttributeNames={};
      let ExpressionAttributeValues = {};
      Object.keys(req.body).forEach((key, index) => {
        if (!params.Key.hasOwnProperty(key)) {
          UpdateExpression.push("#"+key + "=:" + key);
          ExpressionAttributeNames["#"+key]=key;
          ExpressionAttributeValues[":" + key] = req.body[key];
        }
      });
      params.UpdateExpression = "set " + UpdateExpression.join(",");
      params.ExpressionAttributeNames=ExpressionAttributeNames;
      params.ExpressionAttributeValues = ExpressionAttributeValues;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AwsCrud;
