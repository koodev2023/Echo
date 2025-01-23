import React from "react";
import { Badge } from "../ui/badge";

const PostFooterCategory = ({ categories }: { categories: string[] }) => {
  return (
    <div>
      {categories.map((category) => (
        <Badge key={category}>{category}</Badge>
      ))}
    </div>
  );
};

export default PostFooterCategory;
