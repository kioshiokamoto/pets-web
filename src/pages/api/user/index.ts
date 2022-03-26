import { NextApiResponse } from "next";
import nc from "next-connect";

import onError from "../../../middleware/error";
import prisma from "../../../lib/prisma";

//TODO: Add middleware to verify sessions

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.post(async (req: any, res) => {
  const userData = await prisma.user.findFirst({
    where: { email: req?.email },
  });
  delete userData.password;
  delete userData.createdAt;
  delete userData.updatedAt;
  delete userData.emailVerified;
  res.send(userData);
});

export default handler;
