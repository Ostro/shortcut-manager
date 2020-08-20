import { Context } from '../../context';
import { MutationResolvers } from '../../generated/graphql';

export const removeShortcuts: MutationResolvers<Context>['removeShortcuts'] = async (root, { ids }, ctx) => {
  await ctx.prisma.shortcut.deleteMany({
    where: { id: { in: ids }, userUuid: ctx.shadowUuid }
  })

  return ctx.prisma.shortcut.findMany({
    where: { userUuid: ctx.shadowUuid }
  });
};
