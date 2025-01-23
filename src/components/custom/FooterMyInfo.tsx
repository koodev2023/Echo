import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import UserIconWithName from "./UserIconWithName";

const FooterMyInfo = () => {
  return (
    <div className="flex flex-col gap-3 items-start justify-start">
      <UserIconWithName
        userImageUrl="https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        username="John Doe"
        name="John Doe"
      />

      <div className="line-clamp-2 w-5/6">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate,
        quam nisi magni laborum inventore voluptatum laudantium repellat ducimus
        unde aspernatur fuga. Quo, accusantium quisquam! Harum unde culpa.
      </div>
    </div>
  );
};

export default FooterMyInfo;
