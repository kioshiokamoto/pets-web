import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { name, breed, birthDate } = req.body;

  const session = await getSession({ req });
  const result = await prisma.pet.create({
    data: {
      name,
      breed,
      birthDate,
      user: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
