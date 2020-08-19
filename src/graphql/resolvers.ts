import { Context } from '../context';
import { Resolvers } from '../generated/graphql';
import { addShortcut } from './mutations/addShortcut';
import { editShortcut } from './mutations/editShortcut';
import { removeShortcuts } from './mutations/removeShortcuts';
import { shortcut } from './queries/shortcut';
import { shortcuts } from './queries/shortcuts';

export const resolvers: Resolvers<Context> = {
  Query: {
    shortcut,
    shortcuts,
  },
  Mutation: {
    addShortcut,
    editShortcut,
    removeShortcuts
  },
};