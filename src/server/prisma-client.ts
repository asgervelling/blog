/**
 * @fileoverview
 * The PrismaClient should be imported from "@prisma/client/edge",
 * if the intention is to run it on Vercel.
 * See http://pris.ly/d/importing-client
 */
import { PrismaClient as DevClient } from "@prisma/client";
import { PrismaClient as ProdClient } from "@prisma/client/edge";

const inDevelopment = process.env.NODE_ENV === "development";
const PrismaClient = inDevelopment ? DevClient : ProdClient;
export default PrismaClient;
