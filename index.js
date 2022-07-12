const express = require('express')
const { graphqlHTTP } = require('express-graphql');

const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema } = require('graphql')

const app = express()

const PORT = 5000

const Users = [
    { id: 1, email: "test@mail.com", name: 'Mick Mayers' },
    { id: 2, email: "test@test.com", name: 'Scrappy Coco' },
    { id: 3, email: "test@new.com", name: 'Liam Neeson' }
]

const Posts = [
    { id: 1, title: 'Psychology', desc: 'Psychology is the study of the mind and behavior, according to the American Psychological Association. It is the study of the mind, how it works, and how it affects behavior. ', tag: ['Psychology'], createdAt: '2022-07-08T07:47:51.200Z', updatedAt: '2022-07-08T07:47:51.200Z', userId: 1 },
    { id: 2, title: 'Sport', desc: 'Sport is commonly defined as an athletic activity that involves a degree of competition, such as netball or basketball. ', tag: ['Sport'], createdAt: '2022-07-08T09:51:21.289Z', updatedAt: '2022-07-08T09:51:21.289Z', userId: 2 },
    { id: 3, title: 'Sport', desc: 'Sport is defined as an athletic activity that involves a degree of competition, such as netball or basketball. ', tag: ['Sport'], createdAt: '2022-07-08T09:51:21.289Z', updatedAt: '2022-07-08T09:51:21.289Z', userId: 1 },
    { id: 4, title: 'Когда больше ничего не радует: 5 причин выгорания разработчика и как себе помочь', desc: 'Для большинства кодеров характерно многочасовое выполнение одной задачи, глубокая концентрация. В своей работе программист задействует аналитическое мышление, систематизирует информацию, устанавливает причинно-следственные связи, сравнивает и так далее. Эти процессы задействуют лобную долю мозга.', tag: ['Psychology', 'Programming'], createdAt: '2022-07-08T07:47:51.200Z', updatedAt: '2022-07-08T07:47:51.200Z', userId: 3 },
    { id: 5, title: 'Programming', desc: 'Programming is a creative task: there is no right or wrong way to solve a problem, in the same way, that there is no right or wrong way to paint a picture. ', tag: ['Programming'], createdAt: '2022-07-08T07:47:51.200Z', updatedAt: '2022-07-08T07:47:51.200Z', userId: 2 }
]

const PostsType = new GraphQLObjectType({
    name: 'Posts',
    description: 'This represents a post made by a User',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        desc: { type: new GraphQLNonNull(GraphQLString) },
        tag: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        updatedAt: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLInt) },
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user of a post',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        posts: {
            type: new GraphQLList(PostsType),
            description: 'List of All Posts',
            resolve: () => Posts
        },
        users: {
            type: new GraphQLList(UserType),
            description: 'List of All Users',
            resolve: () => Users
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

app.listen(PORT, () => console.log(`Server Running at ${PORT}`))


