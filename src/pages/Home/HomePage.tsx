import { Newsletter } from '../../components';
import {
  BlogSection,
  ToursSection,
  Hero,
  ReviewsSection,
  WhyChooseUs,
  DestinationsSection,
} from './components';

const HomePage = () => {
  return (
    <>
      <Hero />

      <DestinationsSection />

      <ToursSection />

      <WhyChooseUs />

      <ReviewsSection />

      <BlogSection />

      <Newsletter />
    </>
  );
};

export default HomePage;
