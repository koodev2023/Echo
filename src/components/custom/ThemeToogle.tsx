"use client";

import { useTheme } from "next-themes";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToogle = () => {
  // const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  return (
    <>
      {/* <Button variant="ghost" size="icon">
        <Search size={28} />
        <span className="sr-only">Toggle theme</span>
      </Button> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun size={28} className="dark:hidden" />
            <Moon size={28} className="hidden dark:block" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ThemeToogle;
