import Signupform from "@/components/signupform";
import Footer from "@/components/footer";
import Navbar from '@/components/navbar'

const page = async () => {
  return (
    <div className="flex flex-col gap-[50px]">
    <Navbar/>
      <Signupform />
      <Footer className="border-t" />
    </div>
  );
};

export default page;
