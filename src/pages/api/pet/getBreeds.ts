import { NextApiResponse } from "next";
import nc from "next-connect";

import onError from "../../../middleware/error";
import prisma from "../../../lib/prisma";

//TODO: Add middleware to verify sessions

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.get(async (req: any, res) => {
  const breedData = await prisma.breed.findMany({});
  res.send(breedData);
});

export default handler;
