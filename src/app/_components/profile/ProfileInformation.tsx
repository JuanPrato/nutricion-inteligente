import React from 'react';
import { Section } from "~components/utils/section";
import { auth } from "~/server/auth";
import { Avatar } from "~components/utils/avatar";
import { redirect } from "next/navigation";
import { ROUTES } from "~utils/const";

export async function ProfileInformation() {

  const session = await auth();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  const user = session.user;

  return (
      <Section title="Información personal">
        <div className="flex gap-4 justify-center">
          <Avatar img={user.image} alt="profile img" className="size-24 outline"  />
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <h4 className="font-light text-gray-200">{user.email}</h4>
          </div>
        </div>
      </Section>
  );
}