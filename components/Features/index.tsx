import SectionTitle from '@/components/Main/sectionTitle';
import SingleFeature from '@/components/Features/SingleFeature';
import FeaturesData from '@/components/Features/featuresData';

const Features = () => {
  return (
    <>
      <section id="features" className="px-20 py-8 md:py-12 lg:py-4">
        <div className="container">
          <SectionTitle
            title="Tính năng nổi trội"
            paragraph="Để các con luôn có môi trường học tập & phát triển tốt"
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {FeaturesData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
