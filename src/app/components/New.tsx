import Image from "next/image"


const img = [
  {id : 1 , src : '/clothes/1.png'},
  {id : 2 , src : '/clothes/2.png'},
  {id : 3 , src : '/clothes/3.png'},
]


export default function New() {
  return (
    <div className="w-full h-[25.4%] flex justify-around px-1">
      {img.map((item,index)=> (
        <div key={index}>
          <Image src ={item.src} width={700} height={1000}  alt="Pic" className="h-40 w-29 object-cover object-center" loading="lazy"/>
        </div>
      ))}
    </div>
  )
}
