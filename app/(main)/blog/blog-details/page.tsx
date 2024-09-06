import Image from 'next/image';
import { Metadata } from 'next';
import RelatedPost from '@/components/page/homepage/blog/relatedPost';
import SharePost from '@/components/page/homepage/blog/sharePost';
import TagButton from '@/components/page/homepage/blog/tagButton';
import NewsLetterBox from '@/components/page/homepage/contact/newsLetterBox';

//Icon
import CalendarIcon from '@/public/vector/calendar.svg';
import CommentIcon from '@/public/vector/chat.svg';
import SeeIcon from '@/public/vector/eye.svg';
import CornerDecoration from '@/public/vector/corner-decoration.svg';
import FindIcon from '@/public/vector/find-white.svg';

export const metadata: Metadata = {
  title: 'Bài đăng chi tiết',
  description: 'Trang bài đăng chi tiết',
};

const BlogSidebarPage = () => {
  return (
    <>
      <section className="overflow-hidden px-20 pb-[120px] pt-[180px] dark:bg-black">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  Các bé nhạy bén hơn khi được rèn luyện mỗi ngày
                </h1>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-slate-400 border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="mb-5 mr-10 flex items-center">
                      <div className="mr-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src="/images/users/user01.png"
                            alt="author"
                            fill
                            sizes="40px"
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <span className="mb-1 text-base font-medium text-slate-400">
                          Bởi <span> Trần Minh</span>
                        </span>
                      </div>
                    </div>
                    <div className="mb-5 flex items-center">
                      <p className="mr-5 flex items-center text-base font-medium text-slate-500">
                        <span className="mr-3 dark:fill-white">
                          <CalendarIcon />
                        </span>
                        Tháng 4 Năm 2024
                      </p>
                      <p className="mr-5 flex items-center text-base font-medium text-slate-500">
                        <span className="mr-3 dark:fill-white">
                          <CommentIcon />
                        </span>
                        50
                      </p>
                      <p className="flex items-center text-base font-medium text-slate-500">
                        <span className="mr-3 dark:fill-white">
                          <SeeIcon />
                        </span>
                        35
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <a
                      href="#0"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                      Sáng tạo
                    </a>
                  </div>
                </div>
                <div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-slate-500 sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolor quibusdam alias neque, minus ab dolorum libero porro
                    veniam dolores dignissimos quis labore rem quae mollitia
                    quia adipisci ea impedit! Dolorem.
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src="/images/homepageuser/blog3.jpg"
                        alt="image"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <p className="mb-8 text-base font-medium leading-relaxed text-slate-500 sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis enim lobortis scelerisque fermentum. Neque
                    sodales ut etiam sit amet. Ligula ullamcorper
                    <strong className="text-primary dark:text-white">
                      malesuada
                    </strong>
                    proin libero nunc consequat interdum varius. Quam
                    pellentesque nec nam aliquam sem et tortor consequat.
                    Pellentesque adipiscing commodo elit at imperdiet.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-slate-500 sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Semper auctor neque vitae tempus quam pellentesque nec.
                    <span className="text-primary underline dark:text-white">
                      Amet dictum sit amet justo
                    </span>
                    donec enim diam. Varius sit amet mattis vulputate enim nulla
                    aliquet porttitor. Odio pellentesque diam volutpat commodo
                    sed.
                  </p>
                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-slate-500 sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    consectetur adipiscing elit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    mattis vulputate cupidatat.
                  </p>
                  <ul className="mb-10 list-inside list-disc text-slate-500">
                    <li className="mb-2 text-base font-medium text-slate-500 sm:text-lg lg:text-base xl:text-lg">
                      Consectetur adipiscing elit in voluptate velit.
                    </li>
                    <li className="mb-2 text-base font-medium text-slate-500 sm:text-lg lg:text-base xl:text-lg">
                      Mattis vulputate cupidatat.
                    </li>
                    <li className="mb-2 text-base font-medium text-slate-500 sm:text-lg lg:text-base xl:text-lg">
                      Vulputate enim nulla aliquet porttitor odio pellentesque
                    </li>
                    <li className="mb-2 text-base font-medium text-slate-500 sm:text-lg lg:text-base xl:text-lg">
                      Ligula ullamcorper malesuada proin
                    </li>
                  </ul>
                  <div className="relative z-10 mb-10 overflow-hidden rounded-md bg-primary bg-opacity-10 p-8 md:p-9 lg:p-8 xl:p-9">
                    <p className="text-center text-base font-medium italic text-slate-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod incididunt utionals labore et dolore magna
                      aliqua. Quis lobortis scelerisque fermentum, The Neque ut
                      etiam sit amet.
                    </p>
                    <span className="absolute left-0 top-0 z-[-1]">
                      <CornerDecoration />
                    </span>
                    <span className="absolute bottom-0 right-0 z-[-1]"></span>
                  </div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-slate-500 sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    consectetur adipiscing elit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    mattis vulputate cupidatat.
                  </p>
                  <div className="items-center justify-between sm:flex">
                    <div className="mb-5">
                      <h4 className="mb-3 text-sm font-medium text-slate-500">
                        Popular Tags :
                      </h4>
                      <div className="flex items-center">
                        <TagButton text="Design" />
                        <TagButton text="Development" />
                        <TagButton text="Info" />
                      </div>
                    </div>
                    <div className="mb-5">
                      <h5 className="mb-3 text-sm font-medium text-slate-500 sm:text-right">
                        Chia sẻ bài đăng này
                      </h5>
                      <div className="flex items-center sm:justify-end">
                        <SharePost />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-4/12">
              <div className="mb-10 mt-12 rounded-sm bg-white p-6 shadow-md dark:bg-slate-900 dark:shadow-none lg:mt-0">
                <div className="flex items-center justify-between">
                  <input
                    id="search"
                    type="text"
                    placeholder="Tìm kiếm ở đây..."
                    autoComplete="off"
                    className="dark:text-slate-500-dark dark:shadow-two mr-4 w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-slate-500 outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                  <button
                    aria-label="search button"
                    className="flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-sm bg-primary text-white"
                  >
                    <FindIcon />
                  </button>
                </div>
              </div>
              <div className="mb-10 rounded-sm bg-white shadow-md dark:bg-slate-900 dark:shadow-xl">
                <h3 className="border-b border-slate-400 border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Bài viết liên quan
                </h3>
                <ul className="p-8">
                  <li className="mb-6 border-b border-slate-400 border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                    <RelatedPost
                      title="Các bé nhạy bén hơn khi được rèn luyện mỗi ngày"
                      image="/images/homepageuser/blog1.jpg"
                      slug="#"
                      date="12 Tháng 3 Năm 2024"
                    />
                  </li>
                  <li className="mb-6 border-b border-slate-400 border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                    <RelatedPost
                      title="Các bé nhạy bén hơn khi được rèn luyện mỗi ngày"
                      image="/images/homepageuser/blog2.jpg"
                      slug="#"
                      date="4 Tháng 2 Năm 2024"
                    />
                  </li>
                  <li>
                    <RelatedPost
                      title="8 cách giúp bé phát triển tốt hơn"
                      image="/images/homepageuser/blog3.jpg"
                      slug="#"
                      date="05 Tháng 4 Năm 2024"
                    />
                  </li>
                </ul>
              </div>
              <div className="mb-10 rounded-sm bg-white shadow-md dark:bg-slate-900 dark:shadow-none">
                <h3 className="border-b border-slate-400 border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Danh mục phổ biến
                </h3>
                <ul className="px-8 py-6">
                  <li>
                    <a
                      href="#0"
                      className="mb-3 inline-block text-base font-medium text-slate-500 hover:text-primary"
                    >
                      Phụ huynh
                    </a>
                  </li>
                  <li>
                    <a
                      href="#0"
                      className="mb-3 inline-block text-base font-medium text-slate-500 hover:text-primary"
                    >
                      Học sinh
                    </a>
                  </li>
                  <li>
                    <a
                      href="#0"
                      className="mb-3 inline-block text-base font-medium text-slate-500 hover:text-primary"
                    >
                      Phuương pháp học
                    </a>
                  </li>
                  <li>
                    <a
                      href="#0"
                      className="mb-3 inline-block text-base font-medium text-slate-500 hover:text-primary"
                    >
                      Phương pháp dạy trẻ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#0"
                      className="mb-3 inline-block text-base font-medium text-slate-500 hover:text-primary"
                    >
                      Rèn luyện trí não
                    </a>
                  </li>
                </ul>
              </div>

              <NewsLetterBox />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSidebarPage;
