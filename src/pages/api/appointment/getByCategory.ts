import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  const { category } = req.query;
  const session = await getSession({ req });

  const result = await prisma.appointment.findMany({
    where: {
      status: category,
    },
    include: {
      pet: {
        select: {
          name: true,
          user: {
            select: { name: true, email: true, role: true },
          },
        },
      },
    },
  });

  res.json(result);
}
