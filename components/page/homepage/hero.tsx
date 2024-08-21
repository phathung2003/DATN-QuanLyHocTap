'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';

//Decorator
import CircleRightDecoration from '@/public/decoration/circle-right';
import CircleWithWaveDecoration from '@/public/decoration/circle-with-wave';

const cards = [
  {
    date: { day: '25', month: 'May' },
    imageUrl: '/images/homepageuser/card1.jpg',
    title: 'Môi trường học tốt ảnh hướng lớn đến sự phát triển của trẻ',
  },
  {
    date: { day: '10', month: 'Mar' },
    imageUrl: '/images/homepageuser/card2.jpg',
    title:
      'Sự phát triển vượt trội của bé nhờ lộ trình học tập kĩ cưỡng đến từ đội ngũ giáo viên xuất sắc',
  },
  {
    date: { day: '20', month: 'Jan' },
    imageUrl: '/images/homepageuser/card3.jpg',
    title:
      'Nuôi dậy tâm hồn bé con bằng những hoạt động thiện nguyện từ rất sớm',
  },
];

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-white px-20 pb-16 pt-[100px] dark:bg-black md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[120px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="grid grid-flow-col grid-rows-2 gap-3">
          <div className="row-span-2">
            <div className="container">
              <div className="flex flex-wrap">
                <div className="w-full">
                  <div
                    className="wow fadeInUp mx-auto max-w-[800px] text-center"
                    data-wow-delay=".2s"
                  >
                    <Fade
                      direction={'up'}
                      delay={200}
                      cascade
                      damping={1e-1}
                      triggerOnce={true}
                    >
                      <h1 className="mb-5 text-left text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                        Kết nối & Theo dõi
                      </h1>
                      <h2 className="mb-5 text-left text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                        Sự phát triển
                      </h2>
                      <h3 className="mb-5 text-left text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                        Của bé yêu
                      </h3>
                    </Fade>
                    <Fade
                      direction={'up'}
                      delay={400}
                      cascade
                      damping={1e-1}
                      triggerOnce={true}
                    >
                      <p className="dark:text-body-color-dark text-body-color mb-12 text-left text-base !leading-relaxed sm:text-lg md:text-xl">
                        Đăng ký ngay để theo dõi mọi bước phát triển của con bạn
                        và giúp bạn dễ dàng theo dõi tiến trình học tập và phát
                        triển của con
                      </p>
                    </Fade>
                    <Fade
                      direction={'up'}
                      delay={800}
                      cascade
                      damping={1e-1}
                      triggerOnce={true}
                    >
                      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <Link
                          href="/register"
                          className="hover:bg-bg-[#FF5580] rounded-r-full bg-[#FF5580] px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out"
                        >
                          🔥 Đăng ký ngay
                        </Link>
                        <Link
                          href="/login"
                          className="inline-block rounded-full bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                        >
                          Bắt đầu
                        </Link>
                      </div>
                    </Fade>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 z-[0] !px-0 opacity-30 lg:opacity-100">
              <CircleRightDecoration />
            </div>
            <div className="absolute bottom-0 left-0 z-[0] !px-0 opacity-30 lg:opacity-100">
              <CircleWithWaveDecoration />
            </div>
          </div>
          <div className="col-span-2 row-span-2">
            <div className="mx-auto max-w-screen-xl">
              <Fade
                direction={'up'}
                delay={200}
                cascade
                damping={1e-1}
                triggerOnce={true}
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                  {cards.map((card, index) => (
                    <div
                      key={index}
                      className="relative flex h-[450px] w-full items-end justify-start bg-cover bg-center text-left duration-500 hover:scale-105 hover:shadow-xl"
                    >
                      <Image
                        alt="Card"
                        priority
                        fill
                        src={card.imageUrl}
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="to-gray-900 absolute bottom-0 left-0 right-0 top-0 mt-20 bg-gradient-to-b from-transparent" />
                      <div className="absolute left-0 right-0 top-0 mx-5 mt-2 flex items-center justify-between">
                        <a
                          href="#"
                          className="bg-orange-500 px-5 py-2 text-xs uppercase text-white transition duration-500 ease-in-out hover:bg-white hover:text-indigo-600"
                        >
                          Đọc Thêm
                        </a>
                        <div className="font-regular flex flex-col justify-start text-white">
                          <span className="leading-0 text-3xl font-semibold">
                            {card.date.day}
                          </span>
                          <span className="-mt-3">{card.date.month}</span>
                        </div>
                      </div>
                      <main className="z-10 p-5">
                        <a
                          href="#"
                          className="text-md font-regular font-medium leading-7 tracking-tight text-white hover:underline"
                        >
                          {card.title}
                        </a>
                      </main>
                    </div>
                  ))}
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
