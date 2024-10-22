import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { log } from "console";
import { redirect } from "next/navigation"; // Fungsi redirect dari Next.js

export const initialProfile = async () => {
  const user = await currentUser();
  console.log("User:", user);

  if (!user) {
    // Mengarahkan user ke halaman sign-in menggunakan redirect dari Next.js
    redirect("/sign-in"); // Sesuaikan URL ke halaman sign-in Anda
  }

  // Jika sudah login, lanjutkan dengan logika pengambilan profil
  const profile = await db.profile.findFirst({ where: { userId: user.id } });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
