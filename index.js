const express = require('express')
const { graphqlHTTP } = require('express-graphql');

const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema } = require('graphql')

const app = express()

const PORT = 5000

var Owners = [
    { id: 1, name: 'John Astle' },
    { id: 2, name: 'Gautam Sharma' },
    { id: 3, name: 'Kane Williamson' }
]

var Websites = [
    { id: 1, name: 'Facebook', ownerId: 1 },
    { id: 2, name: 'Google', ownerId: 2 },
    { id: 3, name: 'Amazon', ownerId: 3 },
    { id: 4, name: 'Github', ownerId: 1 },
    { id: 5, name: 'Medium', ownerId: 2 },
    { id: 6, name: 'Baidu', ownerId: 3 },
    { id: 7, name: 'Zapak', ownerId: 1 },
    { id: 8, name: 'Cricinfo', ownerId: 2 }
]

const WebsiteType = new GraphQLObjectType({
    name: 'Website',
    description: 'This represents a website made by a Owner(Programmer)',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        ownerId: { type: new GraphQLNonNull(GraphQLInt) },
    })
})

const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    description: 'This represents a owner of a website',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        websites: {
            type: new GraphQLList(WebsiteType),
            description: 'List of All Websites',
            resolve: () => Websites
        },
        owners: {
            type: new GraphQLList(OwnerType),
            description: 'List of All Owners',
            resolve: () => Owners
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


