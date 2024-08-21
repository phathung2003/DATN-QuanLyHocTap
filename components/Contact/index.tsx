import NewsLetterBox from '@/components/Contact/newsLetterBox';

export default function Contact() {
  return (
    <section
      id="contact"
      className="overflow-hidden px-20 py-4 dark:bg-black md:py-8 lg:py-12"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp shadow-three mb-12 rounded-sm bg-white px-8 py-11 dark:bg-slate-900 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Có khó khăn ? Có chúng tôi ở đây
              </h2>
              <p className="text-body-color mb-12 text-base font-medium dark:text-slate-400">
                Team chúng tôi sẽ hỗ trợ bạn qua email.
              </p>
              <form>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="text-dark mb-3 block text-sm font-medium dark:text-white"
                      >
                        Tên của bạn
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Điền vào tên của bạn..."
                        autoComplete="name"
                        className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="text-dark mb-3 block text-sm font-medium dark:text-white"
                      >
                        Email của bạn là gì
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="name"
                        placeholder="Điền vào email..."
                        className="dark:text-body-color-dark dark:shadow-two text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="text-dark mb-3 block text-sm font-medium dark:text-white"
                      >
                        Nội dung cần hỗ trợ
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        autoComplete="off"
                        rows={5}
                        placeholder="Bạn cần hỗ trợ gì nhỉ..."
                        className="dark:text-body-color-dark dark:shadow-two text-body-color w-full resize-none rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button className="shadow-submit dark:shadow-submit-dark rounded-sm bg-[#FF5580] px-9 py-4 text-base font-medium text-white duration-300 hover:bg-[#FF5580]/90">
                      Gửi thông tin
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLetterBox />
          </div>
        </div>
      </div>
    </section>
  );
}
