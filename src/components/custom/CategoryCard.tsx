import React from "react";

const CategoryCard = ({ cat }: { cat: string }) => {
  return (
    <div className="w-full bg-primary text-primary-foreground text-center font-bold rounded-lg text-4xl py-1 capitalize">
      {cat} Blog
    </div>
  );
};

export default CategoryCard;
