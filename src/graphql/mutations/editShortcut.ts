import { Context } from '../../context';
import { MutationResolvers } from '../../generated/graphql';
import { shortcuts } from '../queries/shortcuts';

export const editShortcut: MutationResolvers<Context>['editShortcut'] = async (root, { id, shortcut }, ctx) => {
  await ctx.prisma.shortcut.updateMany({
    where: {
      id,
      userId: ctx.shadowUuid,
    },
    data: shortcut,
  })

  return ctx.prisma.shortcut.findMany({
    where: { userId: ctx.shadowUuid }
  });
};
