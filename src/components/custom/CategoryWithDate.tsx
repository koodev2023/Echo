import { Category } from "@prisma/client";
import React from "react";

const CategoryWithDate = ({
  categories,
  date,
}: {
  categories?: Category[] | null;
  date: string;
}) => {
  return (
    <div className="flex flex-row justify-start text-sm text-muted-foreground">
      {categories && categories.length > 0 && (
        <>
          {categories.map((category) => (
            <span key={category.slug} className="text-primary font-bold">
              {category.title}
            </span>
          ))}

          <span className="whitespace-pre-wrap">{" - "}</span>
        </>
      )}

      <span className="text-muted-foreground">{date}</span>
    </div>
  );
};

export default CategoryWithDate;
