import Image from "next/image"

export default function Footer() {
  return (
    <div className="absolute bottom-0 w-full h-[8%] bg-[#262013] text-white font-sans font-extralight tracking-wide  px-4 text-[10px]">
      <div className="flex gap-4 items-center h-full w-full">
        <span >FOLLOW US</span>
        <div className="flex items-center gap-1">
          <Image width={18} height={18} src={'/icons/insta.svg'} alt="pic"/>
          <span className="align-text-top">@Elegants</span>
        </div>
      </div>
    </div>
  )
}
