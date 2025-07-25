import { getUserById } from "@/app/auth/authController";
import Feed from "@/components/feed";
import type { User } from "@/generated/prisma";
import prisma, { type PostWithUser } from "@/lib/prisma";
import { getUserID } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile | Promptopia",
};

export const dynamic = "force-dynamic";

export default async function Profile() {
  let userId: string = await getUserID();
  let user: User | null = await getUserById(userId);

  if (!user) {
    return redirect("/auth/logout");
  }

  let posts: PostWithUser[] | null = await prisma.post.findMany({
    where: {
      userId,
    },
    include: {
      author: true,
    },
  });

  return (
    <section className="sm:p-4 p-2 bg-gray-950 border-1 border-sky-800 rounded-lg preserve-lines">
      <div className="flex justify-left sm:flex-row flex-col gap-4 my-2 py-2">
        <div>
          <Image
            src="/profile.png"
            alt="profile"
            width={100}
            height={100}
            className="border-1 border-sky-400 rounded-2xl"
          />
        </div>
        <div className="text-pink-500">
          <h2 className="md:text-6xl text-xl font-black">{user.username}</h2>
          <p className="md:text-2xl text-md">{user.email}</p>
          <p className="md:text-lg text-xs text-pink-100">
            Joined AT: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Feed posts={posts} showfull={true} showdetails={true} />

      <div className="py-4">
        <Link
          href="/auth/logout"
          prefetch={false}
          className="my-2 filled_red_btn"
        >
          Logout
        </Link>
      </div>
    </section>
  );
}
