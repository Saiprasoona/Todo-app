import AWS from 'aws-sdk';

AWS.config.update({
    region:process.env.REACT_APP_REGION,
    accessKeyId:process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey:process.env.REACT_APP_SECRET_ACCESS_KEY,
    sessionToken:process.env.REACT_APP_SESSION_TOKEN,
})

const dbClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME="todo"

export const getTasks = async(userId) =>{
    const params={
        TableName:TABLE_NAME,
        Key:{
            userId
        }
    };
    const todoList= await dbClient.get(params).promise().then(resp=>{
        return resp;
    }).catch(err=>console.error(err));
    ;
    return todoList;
}


export const updateTasks = async(item) =>{
    const params={
        TableName:TABLE_NAME,
        Item:item
    };
    return await dbClient.put(params).promise();
}




