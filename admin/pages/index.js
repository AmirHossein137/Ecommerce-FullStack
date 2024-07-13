import { useSession } from "next-auth/react";
import { Hand } from 'lucide-react';


export default function Home() {
  const {data :session} = useSession()
  console.log(session)
  if(!session) return;
  return (
    <div className="text-slate-800 flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Hand />
        Hello,
      </div>
      <span className="font-bold text-lg text-slate-800">{ session.user.email }</span>
    </div>
  )
}
