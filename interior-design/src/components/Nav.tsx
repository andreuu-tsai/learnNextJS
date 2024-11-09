import { Link } from "react-scroll";

export default function Nav() {
  return (
    <div className="hidden w-[300px] bg-red-1 md:flex">
      <div className="ml-12 mr-12 mt-24 flex flex-col text-white">
        <h1 className="text-2xl font-bold">DesignWorks</h1>
        <div className="mt-[104px] flex flex-col items-start gap-5 font-medium">
          <Link
            to="home"
            smooth={true}
            className="cursor-pointer text-white hover:text-white"
          >
            Home
          </Link>
          <Link
            to="showcase"
            smooth={true}
            className="cursor-pointer text-white hover:text-white"
          >
            Showcase
          </Link>
          <Link
            to="services"
            smooth={true}
            className="cursor-pointer text-white hover:text-white"
          >
            Services
          </Link>
          <Link
            to="contact"
            smooth={true}
            className="cursor-pointer text-white hover:text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
