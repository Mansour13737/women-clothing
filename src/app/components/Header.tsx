import Text from "./Text"
export default function Header() {
  return (
    <div className="w-full h-[42.5%] pl-[8%] ">
      <Text children="ELEGANT APPAREL" style=" tracking-wider font-semibold text-[26px] text-wrap mt-[23%] w-[35%]"/>
      <p className=" font-extralight font-sans tracking-wide w-fit mt-2 text-[14px]">FOR WOMEN</p>
    </div>
  )
}
