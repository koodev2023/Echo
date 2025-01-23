import { socialLinks } from "@/constants/socialLinks";
import React from "react";
import { IconBaseProps } from "react-icons";

const SocialLinks = ({
  size,
  hiddenForSmAndMd,
  flex1forNav,
}: {
  size: "sm" | "lg";
  hiddenForSmAndMd: boolean;
  flex1forNav: boolean;
}) => {
  return (
    <div
      className={`flex ${flex1forNav && "flex-1"} flex-row w-min ${
        size === "sm" ? "gap-3" : "gap-5"
      } ${size === "sm" ? "text-sm" : "text-3xl"} ${
        hiddenForSmAndMd && "max-lg:hidden"
      } justify-start items-center`}
    >
      {socialLinks.map((item, index) => (
        <a
          key={index}
          target="_blank"
          href={item.url}
          rel="noopener noreferrer"
        >
          <item.icon />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
