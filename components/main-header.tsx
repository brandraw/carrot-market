import { getSession } from "@/lib/session";
import { UserLogout } from "@/lib/user-logout";
import Link from "next/link";

export default async function MainHeader() {
  const session = await getSession();
  const isLoggedIn = Boolean(session.id);

  return (
    <header className="bg-neutral-100 h-20">
      <div className="h-full flex items-center justify-between px-5">
        <Link href="/" className="font-semibold">
          Home
        </Link>
        <nav>
          <ul className="flex gap-3 *:text-sm *:font-medium">
            {!isLoggedIn && (
              <>
                <li>
                  <Link href="/sms-login">Sms Login</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/signup">Sign Up</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <Link href="/products">Products</Link>
                </li>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <form action={UserLogout}>
                    <button>Log Out</button>
                  </form>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
