import { createServer } from 'node:http'
import { createYoga, createSchema } from 'graphql-yoga'

const users = [
  { id: 1, name: 'Kamil', email: 'kamil@example.com' },
  { id: 2, name: 'Karol', email: 'karol@example.com' },
  { id: 3, name: 'Kasia', email: 'kasia@example.com' },
  { id: 4, name: 'Marcin', email: 'marcin@example.com' },
  { id: 5, name: 'Magda', email: 'magda@example.com' },
  { id: 6, name: 'Joanna', email: 'joanna@example.com' },
  { id: 7, name: 'Jonatan', email: 'jonatan@example.com' },
  { id: 8, name: 'Wojtek', email: 'wojtek@example.com' },
  { id: 9, name: 'Zuzanna', email: 'zuzanna@example.com' },
  { id: 10, name: 'Emilia', email: 'emilia@example.com' }
];


const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    hello: String!
    world: [String!]!
    allUsers: [User!]!
  }

  type Mutation {
    addUser(name: String!, email: String!): User!
    delUser(id: Int!): Boolean!
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hej!',
    world: () => ['s', 'w', 'i', 'a', 't'],
    allUsers: () => users
  },

  Mutation : {
    addUser: (_, {name, email}) => {
      const newUser = {
        id: Math.max(...users.map(user => user.id), 0) + 1,   
        name,
        email
      }
      users.push(newUser);
      return newUser;
    },
    delUser: (_, {id}) => {
      const founedIndex = users.findIndex((user) => user.id == id);
      if(founedIndex != -1) {
        users.splice(founedIndex, 1);
        return true;
      }
      return false;
    }
  }
}

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  })
})

createServer(yoga).listen(4000, () => {
  console.log('✅ Serwer działa na http://localhost:4000/graphql')
})
