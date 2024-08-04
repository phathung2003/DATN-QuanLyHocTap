import Link from 'next/link';

//Icon
import SeeIcon from '@/public/vector/eye.svg';

interface DetailButtonProperties {
  link: string;
  buttonName: string;
}

const DetailButton: React.FC<DetailButtonProperties> = ({
  link,
  buttonName,
}) => {
  return (
    <Link id="detail_Button" href={link}>
      <button className="inline-flex w-max items-center justify-center gap-2.5 rounded-lg bg-yellow-600 px-2 py-2 text-sm text-white hover:bg-yellow-700">
        <SeeIcon className="stroke-curren fill-current" />
        {buttonName}
      </button>
    </Link>
  );
};

export default DetailButton;
