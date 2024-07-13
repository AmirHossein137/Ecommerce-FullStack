import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Nav from "../modules/Nav";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const signInHandler = () => {
    signIn("github");
  };

  const signoutHandler = () => {
    signOut();
  };

  if (!session) {
    return (
      <div className="bg-cyan-900 w-full h-screen flex items-center justify-center">
        <div className="text-center flex items-center justify-center gap-3 w-full">
          <Button
            className="bg-white p-5 text-slate-950 hover:bg-gray-200 transition duration-300"
            onClick={signInHandler}
          >
            Login With GutHub
          </Button>
          <Button
            className="bg-white p-5 text-slate-950 hover:bg-gray-200 transition duration-300"
            onClick={signoutHandler}
          >
            SignOut
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sky-700 w-full h-screen flex ">
      <Nav />
      <div className="bg-white flex-grow mt-3 mb-3 p-4 rounded-l-lg">
        {children}
      </div>
    </div>
  );
};

export default Layout;
