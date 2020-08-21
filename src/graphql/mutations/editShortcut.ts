import { Context } from '../../context';
import { MutationResolvers } from '../../generated/graphql';

export const editShortcut: MutationResolvers<Context>['editShortcut'] = async (root, { id, shortcut }, ctx) => {
  await ctx.prisma.shortcut.updateMany({
    where: {
      id,
      userUuid: ctx.shadowUuid,
    },
    data: {
      name: shortcut.name ?? undefined,
      icon: shortcut.icon ?? undefined,
      path: shortcut.path ?? undefined,
    },
  })

  return ctx.prisma.shortcut.findMany({
    where: { userUuid: ctx.shadowUuid }
  });
};
