import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const petId = req.query.id;
  if (req.method === "DELETE") {
    const post = await prisma.pet.delete({
      where: { id: Number(petId) },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
