import React from "react";
import MenuPosts from "./MenuPosts";

const Menu = () => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-muted-foreground text-sm font-normal">
          What's hot
        </h2>
        <h1 className="w-full flex text-xl font-bold mb-3">Most Popular</h1>
        <MenuPosts />
      </div>

      <div>
        <h2 className="text-muted-foreground text-sm font-normal">
          Discover by topic
        </h2>
        <h1 className="w-full flex text-xl font-bold mb-3">Categories</h1>
        <MenuPosts />
      </div>

      <div>
        <h2 className="text-muted-foreground text-sm font-normal">
          Chosen by the editor
        </h2>
        <h1 className="w-full flex text-xl font-bold mb-3">Editors Pick</h1>
        <MenuPosts />
      </div>
    </div>
  );
};

export default Menu;
