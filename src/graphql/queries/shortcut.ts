import { Context } from '../../context';
import { QueryResolvers } from '../../generated/graphql';

export const shortcut: QueryResolvers<Context>['shortcut'] = async (root, { id }, ctx) => {
  const shortcuts = await ctx.prisma.shortcut.findMany({
    where: { id, userId: ctx.shadowUuid }
  })

  return shortcuts?.shift() ?? null;
};
