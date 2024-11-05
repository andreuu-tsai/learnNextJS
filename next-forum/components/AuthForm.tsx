import Image from "next/image";
import Link from "next/link";
import UserButton from "@/components/UserButton";

export default function AuthForm() {
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex mb-12 cursor-pointer items-center gap-1">
          <Image
            src="icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
      </header>
      <UserButton />
    </section>
  );
}
