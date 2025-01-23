import CardList from "@/components/custom/CardList";
import CategoryCard from "@/components/custom/CategoryCard";
import Menu from "@/components/custom/Menu";

export default function page({
  searchParams,
}: {
  searchParams: { page: string; cat: string };
}) {
  const page = parseInt(searchParams.page) || 1;
  const cat = searchParams.cat || "All";

  return (
    <div className="flex flex-col gap-8">
      {/* <CategoryCard cat={cat} /> */}

      <div className="grid grid-cols-5 lg:grid-cols-7 flex-col gap-y-8">
        {/* <CardList type="HOME" cat={cat} page={page} />
        <Menu /> */}
        Blog Page
      </div>
    </div>
  );
}
