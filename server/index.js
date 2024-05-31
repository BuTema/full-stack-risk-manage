const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
require('dotenv').config()
const { SeedDatabase, ClearDatabase } = require('./seed')

const server = new ApolloServer({ typeDefs, resolvers })

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        server.listen().then(async ({ url }) => {
            console.log(`🚀 Server ready at ${url}`)
            // Use for clear your database if it need  
            await ClearDatabase()

            // Use for create 1000 risks and 20 categories
            await SeedDatabase()
        })
    })

    .catch(error => {
        console.error('Error connecting to MongoDB:', error)
    })