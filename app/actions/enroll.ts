"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { enrollments } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function enrollInProgram(programName: string) {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "You must be signed in to enroll." };
    }

    const email = user.emailAddresses[0]?.emailAddress || "unknown@email.com";
    const name = user.firstName 
      ? `${user.firstName} ${user.lastName || ""}`.trim() 
      : user.username || "Warrior";

    await db.insert(enrollments).values({
      userId: user.id,
      userEmail: email,
      userName: name,
      programName,
      enrolledAt: new Date(),
    });

    revalidatePath("/dashboard");
    return { success: true, message: `Successfully enrolled in ${programName}!` };
  } catch (error) {
    console.error("Failed to enroll:", error);
    return { success: false, error: "Failed to enroll. Please try again later." };
  }
}
