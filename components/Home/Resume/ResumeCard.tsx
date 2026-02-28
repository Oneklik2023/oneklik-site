/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IconType } from "react-icons";

type Props = {
  role: string;
  Icon?: IconType | string;   // <- może być komponent albo url
  /*date?: string;*/
  description: string;
};

const ResumeCard = ({ Icon, role, /*date,*/ description }: Props) => {
  return (
    <div className="mb-6">
      <div className="group flex items-start space-x-6 bg-blue-900/20 transition-all duration-300 p-4 sm:p-8 rounded-md">
        <div /*className="sm:w-24 sm:h-24 w-16 h-16 bg-[#0d0d1f]/50 rounded-full flex items-center justify-center"*/>
          {typeof Icon === "string" ? (
            <img
              src={Icon}
              alt=""
              className="
              w-20 h-20 
              object-contain 
              brightness-0 invert
              transition-all duration-500 ease-out
              group-hover:brightness-100 
              group-hover:invert-0
              group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]
              "
            />
          ) : Icon ? (
            <Icon className="sm:w-16 sm:h-16 w-10 h-10 text-white" />
          ) : null}
        </div>

        <div className="flex-1">
          <h1 className="text-gray-200 text-xl sm:text-2xl font-semibold">
            {role}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base pt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;