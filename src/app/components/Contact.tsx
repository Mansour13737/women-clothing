import Image from "next/image"


export default function Contact() {
  return (
    <div className=" flex items-baseline gap-2 w-fit absolute right-3 top-3">
      <Image src={'/icons/search-f.svg'} width={15} height={15} alt= "pic" className="opacity-90"/>
      <Image src={'/icons/profile-f.svg'} width={16} height={16} alt= "pic" className="opacity-90" />
      <Image src={'/icons/basket-f.svg'} width={16} height={16} alt= "pic" className="opacity-90"/>
    </div>
  )
}
