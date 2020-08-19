import { Context } from '../../context';
import { QueryResolvers } from '../../generated/graphql';

export const shortcuts: QueryResolvers<Context>['shortcuts'] = (root, args, ctx) => {
  return ctx.prisma.shortcut.findMany({
    where: { userId: ctx.shadowUuid }
  });
};
