import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { petId } = req.query;

  const result = await prisma.appointment.findMany({
    where: {
      petId: Number(petId),
    },
    include: {
      pet: {
        select: {
          name: true,
          user: {
            select: { name: true, email: true },
          },
        },
      },
    },
  });

  res.json(result);
}
