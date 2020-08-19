import { IncomingMessage } from 'http';
import { PrismaClient } from '../prisma/generated/Client';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  shadowUuid: string;
}

export function createContext({ req }: { req: IncomingMessage }): Context {
  return { prisma, shadowUuid: req.headers['shadow-uuid'] as string };
};
