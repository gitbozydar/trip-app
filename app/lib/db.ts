import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveReservation(data: {
  name: string;
  email: string;
  phone: string;
  trip: string;
  date: string;
  message?: string;
}) {
  return prisma.reservation.create({ data });
}
