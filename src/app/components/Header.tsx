import Address from "./Address"
import Btn from "./Btn"
import Contact from "./Contact"
import Text from "./Text"


export default function Header() {
  return (
    <div className="w-full h-[42.5%]  pl-[8%] bg-[url('/bg-new1.png')] bg-no-repeat bg-cover bg-center">
      <Address/>
      <Contact/>
      <Text  style=" tracking-widest font-semibold text-[26px] text-wrap mt-[23%] w-[35%]">
        <span>ELEGANT APPAREL</span>
      </Text>
      <p className=" font-extralight font-sans tracking-wide w-fit mt-2 text-[14px]">FOR WOMEN</p>
      <Btn style="py-2 font-extralight tracking-wider px-4  w-fit text-[10px] mt-4 rounded-[7px] bg-[#262013] text-white">SHOP NOW</Btn>
    </div>
  )
}
