const { gql } = require('apollo-server')

const typeDefs = gql`
  type Risk {
    _id: ID!
    name: String!
    description: String!
    category: Category!
    resolved: Boolean!
    createdBy: String!
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    _id: ID!
    name: String!
    description: String!
    createdBy: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    risks(resolved: Boolean, page: Int, limit: Int): [Risk!]!
    categories(page: Int, limit: Int): [Category!]!
  }

  type RemoveResponse {
    success: Boolean!
    message: String!
}

  type Mutation {
    createRisk(name: String!, description: String!, categoryId: ID!, resolved: Boolean!, createdBy: String!): Risk!
    removeRisk(id: ID!): RemoveResponse!
    updateRiskStatus(id: ID!, resolved: Boolean!): Risk!
    updateRisk(id: ID!, name: String!, description: String!): Risk!
    createCategory(name: String!, description: String!, createdBy: String!): Category!
    removeCategory(categoryId: ID!): RemoveResponse!
    updateCategory(id: ID!, name: String!, description: String!): Category!
  }
`

module.exports = typeDefs
