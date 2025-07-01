"use client";

import React from "react";
import UserObituaries from "../../../components/obituary/UserObituaries";
import { Separator } from "@/components/ui/separator";

const ProfilePage: React.FC = () => {
    return (
        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16 py-6 max-md:px-5">
            <Separator className="mb-4" />
            <UserObituaries />
        </section>
    );
};

export default ProfilePage;
