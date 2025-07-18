import Text from "./Text"


export default function Header() {
  return (
    <div className="w-full h-[42.5%]  pl-[8%] bg-[url('/bg-new1.png')] bg-no-repeat bg-cover">
      <Text  style=" tracking-wider font-semibold text-[26px] text-wrap mt-[23%] w-[35%]">
        <span>ELEGANT APPAREL</span>
      </Text>
      <p className=" font-extralight font-sans tracking-wide w-fit mt-2 text-[14px]">FOR WOMEN</p>
    </div>
  )
}
