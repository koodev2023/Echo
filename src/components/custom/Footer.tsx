"use client";

import React from "react";
import FooterMyInfo from "./FooterMyInfo";
import SocialLinks from "./SocialLinks";
import FooterLinks from "./FooterLinks";
// import { topBarLinks } from "@/constants/topBarLinks";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/write" && !/^\/posts\/[^/]+\/edit$/.test(pathname) && (
        <div className="flex flex-col sm:flex-row gap-10 mb-10 max-sm:mt-10">
          <div className="flex flex-col gap-3 items-start justify-center">
            <FooterMyInfo />
            <SocialLinks
              size={"sm"}
              hiddenForSmAndMd={false}
              flex1forNav={false}
            />
          </div>

          <div className="flex flex-row gap-5 max-sm:justify-between">
            {/* <FooterLinks title="Links" items={topBarLinks} />
            <FooterLinks title="Links" items={topBarLinks} />
            <FooterLinks title="Links" items={topBarLinks} />
            <FooterLinks title="Links" items={topBarLinks} /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
