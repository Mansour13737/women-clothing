interface Prps {
    children : React.ReactNode;
    style : string
}


export default function Btn({children,style} : Prps ) {
  return (
    <div className={`${style}`}>
      {children}
    </div>
  )
}
