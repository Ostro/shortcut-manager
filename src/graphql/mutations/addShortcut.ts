import { Context } from '../../context';
import { MutationResolvers } from '../../generated/graphql';
import { shortcuts } from '../queries/shortcuts';

export const addShortcut: MutationResolvers<Context>['addShortcut'] = async (root, { shortcut }, ctx) => {
  await ctx.prisma.shortcut.create({
    data: {
      ...shortcut,
      user: { connect: { shadowUuid: ctx.shadowUuid } }
    }
  });

  return ctx.prisma.shortcut.findMany({
    where: { userUuid: ctx.shadowUuid }
  });
};
