
interface Prps {
    children : React.ReactNode;
    style : string;
    onClick?: () => void;
}

export default function Btn({children, style, onClick} : Prps ) {
  return (
    <div 
      className={`${style}`}
      onClick={onClick}
      
    >
      {children}
    </div>
  )
}
