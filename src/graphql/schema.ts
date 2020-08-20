import { gql } from 'apollo-server';

export const typeDefs = gql`
type Shortcut {
  id: ID!
  name: String!
  path: String!
  icon: String
}

input ShortcutInput {
  name: String!
  path: String!
  icon: String
}

input ShortcutEditInput {
  name: String
  path: String
  icon: String
}

type Query {
  shortcut(id: ID!): Shortcut
  shortcuts: [Shortcut]
}

type Mutation {
  addShortcut(shortcut: ShortcutInput!): [Shortcut]
  editShortcut(id: ID!, shortcut: ShortcutEditInput!): [Shortcut]
  removeShortcuts(ids: [ID!]!): [Shortcut]
}
`;
