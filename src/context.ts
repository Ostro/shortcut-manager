import { IncomingMessage } from 'http';
import { PrismaClient } from '../prisma/generated/Client';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  shadowUuid: string;
}

export async function createContext({ req }: { req: IncomingMessage }): Promise<Context> {
  const shadowUuid = req.headers['shadow-uuid'] as string;
  if (!shadowUuid) {
    throw new Error('Expected shadow-uuid header');
  }

  const user = await prisma.user.findOne({ where: { shadowUuid } })
  if (!user) {
    await prisma.user.create({ data: { shadowUuid } })
  }

  return { prisma, shadowUuid };
};
