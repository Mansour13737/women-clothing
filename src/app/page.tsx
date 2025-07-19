import Header from "./components/Header";
import Text from "./components/Text";
import New from "./components/New";
import Footer from "./components/Footer";

export default function Home() {
  return (
 <div className="w-full relative text-[#262013]  bg-[#dcdddc] h-screen m-0 font-display bg-center bg-cover bg-no-repeat flex flex-col justify-start items-center ">
  <Header/>
  <Text style="h-[6.4%] text-[18px] font-normal flex items-center justify-center">
    <span>NEW ARRIVALS</span>
  </Text>
  <New/>
  <Text style="text-[18px] font-semibold h-[7.4%] flex items-center justify-center">
   <span>ABOUT US</span>
  </Text>
  <Text style="text-[11px] w-[70%] text-wrap flex items-center font-sans leading-5 tracking-widee justify-center text-center ">
    <span>Discover timeless and sophisticated fashion designed to elevate your style</span>
  </Text>
  <Footer/>
 </div>
  );
}
