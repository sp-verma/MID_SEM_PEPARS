import Navbar from "@/components/navbar";
import Top from "@/components/top";

import Card from "@/components/card";
import Footer from "@/components/Footer/Footer";


export default function Home({ searchParams }) {
  return (
    <div className="px-4">
      <Navbar />
      {/* <Link href='/login' className="text-white">LOGIN</Link>
      <Link href='/admin'>Admin</Link>  */}

      <div className="mt-[10px]">
        <Top />
        <Card params={searchParams} />
       
      </div>
      <Footer/>
    </div>
  );
}
