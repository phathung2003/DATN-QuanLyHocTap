export default function SectionTitle({
  title,
  paragraph,
  center,
}: {
  title: string;
  paragraph: string;
  center?;
}) {
  return (
    <>
      <div
        className={`wow fadeInUp mb-[80px] w-full max-w-[580px] ${center ? 'mx-auto text-center' : ''}`}
        data-wow-delay=".1s"
      >
        <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
          {title}
        </h2>
        <p className="text-body-color text-base !leading-relaxed text-slate-500 md:text-lg">
          {paragraph}
        </p>
      </div>
    </>
  );
}
