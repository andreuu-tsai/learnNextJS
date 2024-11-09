import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-scroll";

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
          <p className="text-2xl font-bold text-white">DesignWorks</p>
          <div className="mobilenav-sheet">
            <nav className="flex h-full flex-col gap-6 pt-16 text-white">
              <SheetClose asChild>
                <Link to="home" smooth={true} className="cursor-pointer">
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="showcase" smooth={true} className="cursor-pointer">
                  Showcase
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="services" smooth={true} className="cursor-pointer">
                  Services
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="contact" smooth={true} className="cursor-pointer">
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
