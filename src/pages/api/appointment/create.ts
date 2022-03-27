import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { description, symptoms, petId } = req.body.config;

  const result = await prisma.appointment.create({
    data: {
      description,
      symptoms,
      pet: { connect: { id: petId } },
    },
  });

  res.json(result);
}
