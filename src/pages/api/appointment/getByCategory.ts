import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { description, symptoms, petId } = req.body.config;

  const result = {}

  res.json(result);
}
