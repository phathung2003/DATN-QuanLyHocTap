import { Blog } from '@/types/blog';
import Image from 'next/image';
import Link from 'next/link';

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, author, tags, publishDate } = blog;
  return (
    <>
      <div
        className="wow fadeInUp shadow-one group relative overflow-hidden rounded-sm bg-white shadow-md duration-300 hover:shadow-xl dark:bg-slate-700 dark:hover:shadow-xl"
        data-wow-delay=".1s"
      >
        <Link
          href="/blog/blog-details"
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-[#FF0080] px-4 py-2 text-sm font-semibold capitalize text-white">
            {tags[0]}
          </span>
          <Image
            src={image}
            fill
            priority
            alt="image"
            sizes="(max-width: 600px) 100vw, 
               (max-width: 1200px) 50vw, 
               33vw"
            className="object-contain"
          />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href="/homepageuser/blog/blog-details"
              className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p className="text-body-color mb-6 border-b border-slate-200 pb-6 text-base font-medium dark:border-white dark:border-opacity-10">
            {paragraph}
          </p>
          <div className="flex items-center">
            <div className="slate:border-white slate:border-opacity-10 mr-5 flex items-center border-r border-slate-200 pr-5 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={author.image} alt="author" fill sizes="40px" />
                </div>
              </div>
              <div className="w-full">
                <h4 className="text-slate slate:text-white mb-1 text-sm font-medium">
                  {author.name}
                </h4>
                <p className="text-body-color text-xs">{author.designation}</p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="text-slate slate:text-white mb-1 text-sm font-medium">
                Năm
              </h4>
              <p className="text-body-color text-xs">{publishDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
