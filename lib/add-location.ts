"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function geocodeAddress(address: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    console.error("Failed to fetch:", response.statusText);
    throw new Error("Failed to fetch geolocation data");
  }

  const data = await response.json();
  console.log("Geocoding response:", data); // 👈 See what the API returns

  if (!data.results || data.results.length === 0) {
    console.error("Invalid geocoding result for address:", address);
    throw new Error("Could not geocode address. Please check the address and try again.");
  }

  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
}


export async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const address = formData.get("address")?.toString();
  if (!address) {
    throw new Error("Missing address");
  }

  const { lat, lng } = await geocodeAddress(address);

  const count = await prisma.location.count({
    where: { tripId },
  });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: count,
    },
  });

  redirect(`/trip/${tripId}`);
}
