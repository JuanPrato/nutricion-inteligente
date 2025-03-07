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

  return (
      <Section title="Información personal">
        <Avatar img={session.user.image} alt="profile img" />
      </Section>
  );
}