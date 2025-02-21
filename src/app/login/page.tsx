import Link from "next/link";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Login() {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <main className="bg-primary-dark flex w-xs flex-col items-center justify-center gap-4 rounded-lg py-4">
        <div className="bg-primary-dark relative aspect-square min-h-[150px] rounded-full">
          <Image src="/logo.png" alt="logo" fill></Image>
        </div>
        <div className="border-primary h-0 w-full border-b opacity-30"></div>
        <Link
          href={"/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          Inicia sesión para continuar
        </Link>
      </main>
    </div>
  );
}
