import { Category } from "@prisma/client";
import Link from "next/link";

// Define a color palette
const colors = [
  "bg-red-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-orange-200",
];

const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json();
};

const CategoryList = async () => {
  const data: Category[] = await getData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Popular Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`flex items-center justify-center p-4 ${
              colors[index % colors.length]
            } rounded-lg hover:bg-opacity-75 transition`}
            key={index}
          >
            <span className="text-lg text-black">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
