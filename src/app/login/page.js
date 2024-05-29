import Signupform from "@/components/signupform";
import Footer from "@/components/Footer/Footer";
import Navbar from '@/components/navbar'

const page = async () => {
  return (
    <div className="flex flex-col gap-[50px]">
    <Navbar/>
      <Signupform />
    <Footer/>
    </div>
  );
};

export default page;
