"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import UserRemembrances from "@/components/obituary/UserRemembrances";

const RemembrancesPage: React.FC = () => {
    return (
        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16 py-6 max-md:px-5">
            <Separator className="mb-4" />
            <UserRemembrances />
        </section>
    );
};

export default RemembrancesPage;
