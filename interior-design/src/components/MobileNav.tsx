import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function MobileNav() {
  return (
    <div className="flex h-16 w-full items-center bg-red-1 p-1 md:hidden">
      <Sheet>
        <SheetTrigger>
          <img src="/hamburger.svg" alt="mobile nav" className="m-4 h-6" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="gap-1 border-none bg-red-1 px-8 pt-16"
        >
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>
          <p className="text-2xl font-bold text-white">DesignWorks</p>
          <div className="mobilenav-sheet">
            <nav className="flex h-full flex-col gap-6 pt-16 text-white">
              <SheetClose asChild>
                <Link href="home" className="cursor-pointer">
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="#showcase" className="cursor-pointer">
                  Showcase
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="#services" className="cursor-pointer">
                  Services
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="#contact" className="cursor-pointer">
                  Contact
                </Link>
              </SheetClose>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
      <p className="text-2xl font-bold text-white">DesignWorks</p>
    </div>
  );
}
