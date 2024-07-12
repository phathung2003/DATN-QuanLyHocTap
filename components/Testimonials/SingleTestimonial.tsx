import { Testimonial } from '@/types/testimonial';
import Image from 'next/image';

//Icon
import StarIcon from '@/public/vector/star.svg';

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;

  const ratingIcons: JSX.Element[] = [];
  for (let index = 0; index < star; index++) {
    ratingIcons.push(
      <span key={index} className="text-amber-400">
        <StarIcon />
      </span>,
    );
  }

  return (
    <div className="w-full">
      <div
        className="wow fadeInUp shadow-two dark:shadow-three dark:hover:shadow-gray-dark hover:shadow-one rounded-sm bg-white p-8 duration-300 dark:bg-black lg:px-5 xl:px-8"
        data-wow-delay=".1s"
      >
        <div className="mb-5 flex items-center space-x-1">{ratingIcons}</div>
        <p className="text-body-color mb-8 border-b border-slate-200 pb-8 text-base leading-relaxed dark:border-white dark:border-opacity-10 dark:text-white">
          “{content}
        </p>
        <div className="flex items-center">
          <div className="relative mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
            <Image src={image} alt={name} width={50} height={50} />
          </div>
          <div className="w-full">
            <h3 className="text-dark mb-1 text-lg font-semibold dark:text-white lg:text-base xl:text-lg">
              {name}
            </h3>
            <p className="text-body-color text-sm">{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;
