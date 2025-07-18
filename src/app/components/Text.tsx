interface Children {
    children : React.ReactNode;
    style? : string;
}


export default function Text({children,style} : Children) {
  return (
    <h2 className={`${style}`}>
      {children}
    </h2>
  )
}
