import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-cyan-900 w-full h-screen flex items-center justify-center">
        <div className="text-center w-full">
          <Button className="bg-white p-5 text-slate-950 hover:bg-gray-200 transition duration-300" onClick={() => signIn('google')}>
            Login With Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>Logged in { session.user.email }</div>
  )
}
