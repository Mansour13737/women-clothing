import Link from "next/link"

export default function Address() {
  return (
    <div className="flex gap-3 text-[11px] font-sans tracking-wide  font-extralight absolute left-[%8] top-5">
      <Link href={'/'}>
        <span>HOME</span>
      </Link>
      <Link href={'/shop'}>
      <span>SHOP</span>
      </Link>
      <Link href={'/about'}>
      <span>ABOUT</span>
      </Link>
    </div>
  )
}
