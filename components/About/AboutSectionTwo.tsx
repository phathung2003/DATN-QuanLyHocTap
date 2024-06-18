import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="px-20 py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/homepageuser/about-image.svg"
                alt="about image"
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
              <Image
                src="/images/homepageuser/about-image.svg"
                alt="about image"
                fill
                className="drop-shadow-three hidden dark:block dark:drop-shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Theo dõi tiến độ học tập
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Phụ huynh có thể dễ dàng truy cập và xem báo cáo chi tiết hàng ngày về hoạt động học tập của trẻ. Gồm thông tin về các kỹ năng đã học, các mục tiêu đã đạt được,.. 
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Kho tài liệu học tập phong phú
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Chúng tôi cung cấp một nguồn tài liệu học tập phong phú và đa dạng, bao gồm các bài giảng, video hướng dẫn, bài tập và trò chơi giáo dục. 
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Trò chuyện & hỗ trợ trực tuyến
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Trang web còn tích hợp tính năng trò chuyện và hỗ trợ trực tuyến, cho phép phụ huynh liên hệ ngay lập tức với đội ngũ hỗ trợ khi gặp bất kỳ vấn đề nào hoặc cần sự tư vấn. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
