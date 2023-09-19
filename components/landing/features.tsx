import SectionTitle from "./section-title";
import { Feature } from "@/types";
import FeatureTile from "./feature-tile";
import { features } from "@/constants/landing";

const Features = () => {
  return (
    <section className="landing-container">
      <SectionTitle
        className="text-center max-w-3xl mx-auto"
        subheading="Features"
        heading="Beautiful analytics to grow smarter"
        content="Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups."
      />
      <div className="space-y-14 mt-20">
        {features.map((feature) => (
          <FeatureTile feature={feature} key={feature.id} />
        ))}
      </div>
    </section>
  );
};

export default Features;
