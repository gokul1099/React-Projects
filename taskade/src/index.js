const { ApolloServer, gql } = require('apollo-server');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config();

const getToken = (user) => {
    jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: '7 days' })
}

const getUserFromToken = async (token, db) => {
    if (!token) { return null }
    const tokenData = jwt.verify(token, process.env.JWT_TOKEN);
    if (!tokenData?.id) { return null }
    return await db.collection('users').findOne({ _id: ObjectId(tokenData.id) });
}

const typeDefs = gql`
type Query{
    myTaskLists : [TaskList]
    getTaskList(id:ID!):TaskList

}
type Mutation{
    signUp(input:signUpInput):AuthUser!
    signIn(input:signInInput):AuthUser!

    createTaskList(title:String!):TaskList!
    updateTaskList(title:String!,id:ID!):TaskList
    deleteTaskList(id:ID!):Boolean!
    addUserToTaskList(id:ID!,userId:ID!):TaskList!

    createToDo(content: String!,taskListId:ID!):ToDo!
    updateToDo(content: String!,id:ID!,isCompleted:Boolean):ToDo!
    deleteToDo(id:ID!):Boolean!
}
input signInInput{
    email:String!
    password:String!
}
input signUpInput{
    email:String!
    password:String!
    name:String!
    avatar:String
}
type AuthUser{
    user:User!
    token:String!
}
type User{
    id: ID!
    name: String!
    email: String!
    avatar: String
}
type TaskList{
    id: ID!
    createdAt: String!
    title: String!
    progress: Float!
    users:[User!]
    todos:[ToDo!]
}

type ToDo{
    id:ID!
    content:String!
    isCompleted:Boolean!
    taskList:TaskList
}
`


const resolver = {
    Query: {
        myTaskLists: async (_, __, { db, user }) => {
            if (!user) { throw new Error('You must be logged in') }
            return await db.collection("TaskList").find({ userIds: user._id }).toArray()
        },
        getTaskList: async (_, { id }, { db, user }) => {
            if (!user) { throw new Error('You must be logged in to get a tasklist') }
            const taskList = await db.collection('TaskList').findOne({ _id: ObjectId(id) });
            if (!taskList.users.includes(user._id)) { throw new Error('You are not allowed to get this tasklist') }
            return taskList;
        },
    },
    Mutation: {
        signUp: async (_, { input }, { db }) => {
            const hashedPassword = bcrypt.hashSync(input.password);
            const newUser = {
                ...input,
                password: hashedPassword
            }
            const result = await db.collection('User').insert(newUser);
            const user = result.ops[0];
            return {
                user,
                token: getToken(user)
            }


        },
        signIn: async (_, { input }, { db }) => {
            const user = await db.collection('User').findOne({ email: input.email });
            if (!user) {
                throw new Error('User not found');
            }
            const isValid = user && bcrypt.compareSync(input.password, user.password);
            if (!isValid) {
                throw new Error('Invalid password');
            }
            return {
                user,
                token: getToken(user)
            }
        },
        createTaskList: async (_, { title }, { db, user }) => {
            if (!user) {
                throw new Error('You must be logged in to create a tasklist')
            }
            const newTaskList = {
                title,
                createdAt: new Date().toISOString(),
                progress: 0,
                users: [user._id],
                todos: []
            }
            const result = await db.collection('TaskList').insert(newTaskList);
            const taskList = result.ops[0];

        },
        updateTaskList: async (_, { title, id }, { db, user }) => {
            if (!user) { throw new Error('You must be logged in to update a tasklist') }
            const taskList = await db.collection('TaskList').findOne({ _id: ObjectId(id) });
            if (!taskList.users.includes(user._id)) { throw new Error('You are not allowed to update this tasklist') }
            return await db.collection('TaskList').updateOne({ _id: ObjectId(id) }, { $set: { title } });

        },
        deleteTaskList: async (_, { id }, { db, user }) => {
            if (!user) { throw new Error('You must be logged in to delete a tasklist') }
            if (!taskList.users.includes(user._id)) { throw new Error('You are not allowed to delete this tasklist') }
            await db.collection('TaskList').deleteOne({ _id: ObjectId(id) });
            return true;
        },
        addUserToTaskList: async (_, { id, userId }, { db, user }) => {
            if (!user) { throw new Error('You must be logged in to add a user to a tasklist') }
            const taskList = await db.collection('TaskList').findOne({ _id: ObjectId(id) });
            if (!taskList) { return null }
            if (taskList.users.find((dbid) => dbid.toString() === userId.toString())) {
                throw new Error('User already in tasklist')
            }
            await db.collection('TaskList').updateOne({ _id: ObjectId(id) }, { $push: { users: userId } });
            taskList.users.push(userId);
            return taskList;
        },
        createToDo: async (_, { content, taskListId }, { db, user }) => {
            if (!user) { throw new Error('You must be logged in to create a todo') }
            const newTodo = {
                content,
                taskListId: ObjectId(taskListId),
                isCompleted: false,
            }
            return result.ops[0];
        },
        updateToDo: async (_, data, { db, user }) => {
            if (!user) { throw new Error('You must be logged in to update a todo') }
            const result = await db.collection("ToDo").updateOne({ _id: ObjectId(data.id) }, { $set: { data } });
            return await db.collection("ToDo").findOne({ _id: ObjectId(id) });
        },
        deleteToDo: async (_, { id }, { db, user }) => {
            if (!user) { throw new Error('You must be logged in to delete a todo') }
            await db.collection("ToDo").removeOne({ _id: ObjectId(id) });
            return true;
        }

    },
    User: {
        id: ({ _id, id }) => _id || id,
    },
    TaskList: {
        id: ({ _id, id }) => _id || id,
        progress: async ({ _id }, _, { db }) => {
            const todos = await db.collection("ToDo").find({ taskListId: _id }).toArray();
            const completedTodos = todos.filter(todo => todo.isCompleted);
            if (todos.length === 0) { return 0 }
            return completedTodos.length / todos.length;
        },
        users: async ({ userIds }, _, { db }) => {
            Promise.all(userIds.map((userId) => db.collection('Users').findOne({ _id: userId })))
        },
        todos: async ({ _id }, _, { db }) => {
            await db.collection('ToDo').find({ taskListId: ObjectId(_id) }).toArray()
        },
    },
    ToDo: {
        id: ({ _id, id }) => _id || id,
        taskList: async ({ taskListId }, _, db) => await db.collection('TaskList').findOne({ _id: ObjectId(taskListId) }),
    }
}

const start = async () => {
    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect()
    const db = client.db(process.env.DB_NAME);
    const context = {
        db,
    }
    const server = new ApolloServer({
        typeDefs,
        resolvers: resolver,
        context: async ({ req }) => {
            const user = await getUserFromToken(req.headers.authorization, db);
            return {
                db,
                user
            }

        }
    });
    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    })
}

start();



