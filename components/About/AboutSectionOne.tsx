import SectionTitle from '@/components/Main/sectionTitle';

//Icon
import CheckIcon from '@/public/vector/check.svg';
import AboutImage from '@/public/vector/about-image.svg';
import AboutImageDark from '@/public/vector/about-image-dark.svg';

interface ListProps {
  text: string;
}

const AboutSectionOne = () => {
  const List: React.FC<ListProps> = ({ text }) => (
    <p className="text-body-color mb-5 flex items-center text-lg font-medium">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        <span className="fill-current">
          <CheckIcon />
        </span>
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="px-20 pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-slate-200 pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="Hỗ trợ và nâng cao quá trình học tập"
                paragraph="Website hỗ trợ phong phú các tính năng để phụ huynh yên tâm khi quản lý việc học của các bé"
              />

              <div
                className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Phong phú và đa dạng" />
                    <List text="Linh hoạt" />
                    <List text="Nhanh chóng" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="An toàn" />
                    <List text="Toàn diện" />
                    <List text="Phát triển" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <div className="drop-shadow-three mx-auto max-w-full dark:hidden dark:drop-shadow-none lg:mr-0">
                  <AboutImage />
                </div>

                <div className="drop-shadow-three mx-auto hidden max-w-full dark:block dark:drop-shadow-none lg:mr-0">
                  <AboutImageDark />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
