"use client";

import { logout } from "@/actions/logout";
import { KwissesList } from "@/components/KwissesList";
import { PlayersList } from "@/components/PlayersList";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Kwis, Player } from "@prisma/client";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const user = useCurrentUser();

  // For some reason this is necessary to make sure the session is loaded
  // It looks like setting the session takes longer than the initial render
  if (!user) {
    location.reload();
  }

  return (
    <div className="w-full">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome, {user?.name}!
          </h2>
        </div>
      </div>
      <KwissesList kwisses={user?.kwisses as Kwis[]} />
      <PlayersList players={user?.players as Player[]} />
    </div>
  );
};
export default DashboardPage;
