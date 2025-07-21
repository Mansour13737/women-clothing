import SearchIcon from './icons/SearchIcon';
import ProfileIcon from './icons/ProfileIcon';
import BasketIcon from './icons/BasketIcon';

interface Style {
  style: string;
}

export default function Contact({ style }: Style) {
  return (
    <div className={style} style={{ color: 'inherit' }}>
      <SearchIcon className="w-4 h-4 opacity-90" />
      <ProfileIcon className="w-4 h-4 opacity-90" />
      <BasketIcon className="w-4 h-4 opacity-90" />
    </div>
  );
}
