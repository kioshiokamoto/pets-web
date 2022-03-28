import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { id, status, bloodTest, medicine, image } = req.body.config;

  const result = await prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status,
      bloodTest,
      medicine,
      image,
    },
  });

  res.json(result);
}
