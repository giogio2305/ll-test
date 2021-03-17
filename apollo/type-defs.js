import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
    id: ID!
    pseudo: String!
    email: String!
    createdAt: Int!
  }

  input SignUpInput {
    pseudo: String!
    email: String!
    password: String!
  }

  input SignInInput {
    pseudo: String!
    email: String!
    password: String!
  }

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
  }
`
