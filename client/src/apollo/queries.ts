import { gql } from "@apollo/client"

const ADD_RISK = gql`
  mutation AddRisk($name: String!, $description: String!, $categoryId: ID!, $resolved: Boolean!, $createdBy: String!) {
    createRisk(name: $name, description: $description, categoryId: $categoryId, resolved: $resolved, createdBy: $createdBy) {
      _id
      name
      description
      category {
        _id
      }
      resolved
      createdBy 
      createdAt
    }
  }
`

const GET_RISKS = gql`
  query GetRisks($resolved: Boolean, $page: Int, $limit: Int) {
    risks(resolved: $resolved, page: $page, limit: $limit) {
      _id
      name
      description
      category {
        _id
        name
      }
      resolved
      createdBy
      createdAt
    }
  }
`

const REMOVE_RISK = gql`
  mutation RemoveRisk($id: ID!) {
    removeRisk(id: $id) {
      success
      message
    }
  }
`

const UPDATE_RISK_STATUS = gql`
  mutation UpdateRiskStatus($id: ID!, $resolved: Boolean!) {
    updateRiskStatus(id: $id, resolved: $resolved) {
      _id
      resolved
    }
  }
`

const UPDATE_RISK = gql`
  mutation UpdateRisk($id: ID!, $name: String!, $description: String!) {
    updateRisk(id: $id, name: $name, description: $description) {
      _id
      name
      description
      category {
        _id
        name
      }
      resolved
      createdBy
      createdAt
      updatedAt
    }
  }
`

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String!, $description: String!) {
    updateCategory(id: $id, name: $name, description: $description) {
      _id
      name
      description
      createdBy
      createdAt
      updatedAt
    }
  }
`

const GET_CATEGORIES = gql`
  query GetCategories($page: Int, $limit: Int) {
    categories(page: $page, limit: $limit) {
      _id
      name
      description
      createdBy
      createdAt
    }
  }
`

const REMOVE_CATEGORY = gql`
  mutation RemoveCategory($id: ID!) {
    removeCategory(categoryId: $id) {
      success
      message
    }
  }
`

const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!, $description: String!, $createdBy: String!) {
    createCategory(name: $name, description: $description, createdBy: $createdBy) {
      _id
      name
      description
      createdBy
      createdAt
    }
  }
`
export {
  GET_CATEGORIES,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  GET_RISKS,
  ADD_RISK,
  REMOVE_RISK,
  UPDATE_RISK,
  UPDATE_RISK_STATUS
}