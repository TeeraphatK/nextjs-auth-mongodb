"use client"

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  return (
    <main>
      <Navbar session={session} />
      <div className="container mx-auto">
        <h3>Welcome to home page</h3>
        <hr className="my-3" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita exercitationem reprehenderit, atque voluptate blanditiis libero! Ducimus perferendis doloremque rerum aliquam ipsa facere! Quos autem voluptatum esse! Perferendis vero aliquam incidunt.</p>
      </div>
    </main>
  );
}
