import React from "react";
import CardLoading from "./CardLoading";

const CardListLoading = () => {
  return (
    <div className="flex flex-col gap-5 md:gap-8 w-full">
      {[...Array(6)].map((_, index) => (
        <CardLoading key={index} />
      ))}
    </div>
  );
};

export default CardListLoading;
