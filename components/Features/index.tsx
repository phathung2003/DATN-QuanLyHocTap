import SectionTitle from '../Common copy/SectionTitle';
import SingleFeature from './SingleFeature';
import featuresData from './featuresData';

const Features = () => {
  return (
    <>
      <section id="features" className="px-20 py-8 md:py-12 lg:py-16">
        <div className="container">
          <SectionTitle
            title="Tính năng nổi trội"
            paragraph="Để các con luôn có môi trường học tập & phát triển tốt"
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
