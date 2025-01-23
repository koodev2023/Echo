import React from "react";
import { Button } from "../ui/button";
import { SquarePen } from "lucide-react";
import Link from "next/link";

const WriteButton = () => {
  return (
    <Button variant="ghost" className="text font-normal px-2 gap-1.5" asChild>
      <Link href="/write">
        <SquarePen />
        Write
      </Link>
    </Button>
  );
};

export default WriteButton;
