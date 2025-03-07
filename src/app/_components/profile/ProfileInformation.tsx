import React from 'react';
import { Section } from "~components/utils/section";
import { Avatar } from "~components/utils/avatar";
import type { User } from "next-auth";

interface ProfileInformationProps {
  user: User;
}

export async function ProfileInformation({ user }: ProfileInformationProps) {

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