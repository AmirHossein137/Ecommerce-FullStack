import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const signInHandler = () => {
    signIn("github");
  };

  const signoutHandler = () => {
    signOut();
  };

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
