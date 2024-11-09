import "./App.css";
import Nav from "./components/Nav";
import MobileNav from "./components/MobileNav";
import Page from "./components/Page";

function App() {
  return (
    <div className="flex h-full w-screen">
      <Nav />
      <div className="flex size-full flex-col">
        <MobileNav />
        <div className="m-4 mt-4 md:ml-16 md:mr-16 md:mt-[72px]">
          <Page />
        </div>
      </div>
    </div>
  );
}

export default App;
