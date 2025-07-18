import Image from "next/image"


const img = [
  {id : 1 , src : '/clothes/1.png'},
  {id : 2 , src : '/clothes/2.png'},
  {id : 3 , src : '/clothes/3.png'},
]


export default function New() {
  return (
    <div className="w-full h-[25.4%] flex justify-around">
      {img.map((item)=> (
        <Image src ={item.src} width={300} height={1400} alt="Pic"/>
      ))}
    </div>
  )
}
