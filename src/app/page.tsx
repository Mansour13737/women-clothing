import Header from "./components/Header";
import Text from "./components/Text";
import New from "./components/New";

export default function Home() {
  return (
 <div className="w-full bg-[#c7cdcb] h-screen m-0 font-display bg-center bg-cover bg-no-repeat flex flex-col justify-start items-center ">
  <Header/>
  <Text style="h-[7.4%] flex items-center justify-center">
    <span>NEW ARRIVALS</span>
  </Text>
  <New/>
  <Text style="text-[18px] font-bold h-[7.4%] flex items-center justify-center">
   <span>ABOUT US</span>
  </Text>
  <Text style="text-[12px] w-[70%] text-wrap flex items-center justify-center text-center ">
    <span>Discover timeless and sophisticated fashion designed to elevate your style</span>
  </Text>
 </div>
  );
}
