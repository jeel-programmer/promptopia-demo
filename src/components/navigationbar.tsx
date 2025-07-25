import { verifySession, type VerifySessionResult } from "@/lib/session";
import Link from "next/link";

export default async function NavigationBar() {
  let { isAuth }: VerifySessionResult = await verifySession();

  return (
    <div className="w-full px-4 text-center mt-5">
      <div className="mb-2">
        <h1 className="text-3xl sm:text-5xl font-black">
          Discover & Share Prompts
        </h1>
        <p className="text-orange-500 red_bule_gradient font-extrabold text-xl sm:text-3xl mt-1 uppercase tracking-wide">
          AI Prompting Tool
        </p>
      </div>

      <div className="mb-4">
        <p className="text-gray-400 text-base sm:text-lg font-light sm:font-medium">
          An open source, AI prompt sharing tool.
        </p>
      </div>

      {!isAuth && (
        <div className="my-4 flex justify-center gap-5">
          <Link href="/auth/login" prefetch={false} className="filled_blue_btn">
            Login
          </Link>
          <Link
            href="/auth/signup"
            prefetch={false}
            className="filled_blue_btn"
          >
            Create Account
          </Link>
        </div>
      )}

      {isAuth && (
        <div className="my-4 flex justify-center gap-5">
          <Link href="/profile" prefetch={false} className="filled_blue_btn">
            My Profile
          </Link>
          <Link
            href="/posts/create"
            prefetch={false}
            className="filled_blue_btn"
          >
            Create Post
          </Link>
        </div>
      )}
    </div>
  );
}
