import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SubscriptionDetailsButton } from "@clerk/nextjs/experimental";
import { db } from "@/lib/db";
import { enrollments } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  // Fetch actual billing options from Clerk
  const client = await clerkClient();
  let subscriptionName = "Free Warrior";
  let isActive = false;
  
  try {
    const sub = await client.billing.getUserBillingSubscription(user.id);
    const status = (sub as any)?.status as string;
    if (sub && (status === 'active' || status === 'trialing')) {
      isActive = true;
      // Log the subscription object to the server console to inspect its structure
      console.log("Clerk Billing Subscription Object:", JSON.stringify(sub, null, 2));
      
      // Clerk's subscription API may contain plan, title, or subscriptionPlan depending on version
      subscriptionName = 
        (sub as any).title || 
        (sub as any).name || 
        (sub as any).subscriptionPlan?.name || 
        (sub as any).plan?.name || 
        (sub as any).product?.name || 
        (sub as any).planId ||
        "Active Plan"; 
    }
  } catch (error) {
    // If billing is not configured or user has no sub, it may throw a 404
    console.log("No active subscription found or billing not configured.");
  }

  // Fetch real enrollments from DB
  const userEnrollments = await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.userId, user!.id))
    .orderBy(desc(enrollments.enrolledAt))
    .limit(10);

  return (
    <div className="min-h-screen bg-gym-dark">
      {/* Header */}
      <header className="border-b border-white/10 bg-gym-dark/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gym-red rounded-sm flex items-center justify-center font-black text-white text-sm">R</div>
            <span className="text-lg font-black tracking-wider text-white">
              REVOLUTION <span className="text-gym-red">GYM</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Welcome back,{" "}
            <span className="text-gym-red">
              {user.firstName || user.username || "Warrior"}
            </span>
            !
          </h1>
          <p className="text-white/50 mt-2">
            Ready to crush another workout? Here&apos;s your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Membership Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gym-dark-card to-gym-dark border border-gym-red/30 col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gym-red/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gym-red">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-white">My Membership</h2>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-gym-red font-bold text-sm uppercase tracking-widest">{subscriptionName}</p>
              <p className="text-2xl font-black text-white mt-1">
                {isActive ? "Active" : "Free"}
              </p>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <SubscriptionDetailsButton>
                  <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer">
                    Manage Billing Options
                  </button>
                </SubscriptionDetailsButton>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-6 rounded-2xl bg-gym-dark-card border border-white/5">
            <h2 className="text-lg font-bold text-white mb-4">This Month</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-sm">Workouts</span>
                <span className="text-white font-bold text-lg">12</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-gradient-to-r from-gym-red to-gym-orange rounded-full" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-sm">Calories Burned</span>
                <span className="text-white font-bold text-lg">8,400</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-sm">Hours Trained</span>
                <span className="text-white font-bold text-lg">18.5</span>
              </div>
            </div>
          </div>

          {/* Enrolled Programs - live from DB */}
          <div className="p-6 rounded-2xl bg-gym-dark-card border border-white/5">
            <h2 className="text-lg font-bold text-white mb-4">My Programs</h2>
            <div className="space-y-3">
              {userEnrollments.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-white/40 text-sm">No programs enrolled yet.</p>
                  <Link
                    href="/#programs"
                    className="mt-3 inline-block text-gym-red text-sm font-semibold hover:underline"
                  >
                    Browse Programs →
                  </Link>
                </div>
              ) : (
                userEnrollments.map((e) => (
                  <div key={e.id} className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-white font-semibold text-sm">{e.programName}</p>
                    <p className="text-white/40 text-xs mt-1">
                      Enrolled {new Date(e.enrolledAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
