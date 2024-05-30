
import Top from "@/components/top";
import Card from "@/components/card";


export default function Home({ searchParams }) {
  return (
    <div className="px-4">
      <Top />
      <Card params={searchParams} />
    </div>
  );
}
