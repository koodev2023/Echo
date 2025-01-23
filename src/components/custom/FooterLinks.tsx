import React from "react";

const FooterLinks = ({
  title,
  items,
}: {
  title: string;
  items: { name: string; href: string }[];
}) => {
  return (
    <div className="flex flex-col gap-3 items-start justify-start">
      <h1 className="text-sm font-semibold">{title}</h1>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-sm text-muted-foreground"
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
