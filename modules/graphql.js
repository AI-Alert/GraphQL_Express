const {GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema} = require("graphql");
const {Owners, Websites } = require('../models/model')

class GraphqlModule{

    async graphqlFunc (){
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


    }



}





module.exports = new GraphqlModule()