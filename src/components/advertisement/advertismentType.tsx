"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface AdvertisementTypeMenuProps {
    types: string[];
    activeType: string;
    setActiveType: (type: string) => void;
}

const AdvertisementTypeMenu: React.FC<AdvertisementTypeMenuProps> = ({ types, activeType, setActiveType }) => {
    return (
        <div className="bg-primary p-4 overflow-x-auto h-[72px]">
            <div className="flex justify-start md:justify-center items-center min-w-max px-2">
                {types.map((type, index) => (
                    <React.Fragment key={type}>
                        <Button
                            variant="ghost"
                            className={cn(
                                "border-none whitespace-nowrap text-white font-poppins text-base",
                                activeType === type ? "font-bold bg-white rounded-lg text-[#1D94C5]" : "font-normal"
                            )}
                            onClick={() => setActiveType(type)}
                        >
                            {type}
                        </Button>
                        {index < types.length - 1 && (
                            <Separator orientation="vertical" className="h-6 mx-2 text-white" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default AdvertisementTypeMenu;