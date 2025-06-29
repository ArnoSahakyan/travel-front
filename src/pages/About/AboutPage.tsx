import { stats, team, values } from '../../assets';

const AboutPage = () => {
  return (
    <div className='bg-background-light dark:bg-background-dark'>
      <main className='relative isolate'>
        {/* Background */}
        <div
          aria-hidden='true'
          className='absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl'
        >
          <div
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
            className='aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-primary-light to-secondary-light opacity-20 dark:opacity-25'
          />
        </div>

        {/* Header section */}
        <div className='px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl pt-24 text-center sm:pt-40'>
            <h1 className='text-5xl font-semibold tracking-tight text-primary-light dark:text-text-dark sm:text-7xl'>
              Our Story
            </h1>
            <p className='mt-8 text-pretty text-lg font-medium text-secondary-light dark:text-secondary-dark sm:text-xl/8'>
              Born from a passion for exploration, we craft journeys that transform the way you see
              the world. Every itinerary is a doorway to new perspectives and unforgettable
              memories.
            </p>
          </div>
        </div>

        {/* Content section */}
        <div className='mx-auto mt-20 max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
            <div className='grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-secondary-light dark:text-secondary-dark lg:max-w-none lg:grid-cols-2'>
              <div>
                <p>
                  Founded in 2012 by avid traveler Sarah Johnson, our agency began as a small team
                  of explorers with a shared vision: to create travel experiences that go beyond the
                  ordinary. What started as a passion project has grown into a global network of
                  travel experts, local guides, and hospitality partners across 50+ countries.
                </p>
                <p className='mt-8'>
                  We believe travel should be transformative, not transactional. That's why we
                  personally vet every hotel, tour operator, and experience in our portfolio. From
                  the bustling markets of Marrakech to the serene beaches of Bali, we've walked
                  every path we recommend.
                </p>
              </div>
              <div>
                <p>
                  Our approach combines insider knowledge with personalized service. Whether you're
                  seeking adventure, relaxation, or cultural immersion, we design journeys that
                  reflect your unique travel style. No cookie-cutter packages—just authentic
                  experiences tailored to you.
                </p>
                <p className='mt-8'>
                  Sustainability is at our core. We partner with eco-conscious providers and
                  community-based tourism initiatives to ensure our adventures preserve the
                  destinations we love for future generations. Travel with us, and leave only
                  footprints while taking home memories that last a lifetime.
                </p>
              </div>
            </div>
            <dl className='mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4'>
              {stats.map((stat, statIdx) => (
                <div
                  key={statIdx}
                  className='flex flex-col-reverse gap-y-3 border-l border-primary-light/20 dark:border-primary-dark/20 pl-6'
                >
                  <dt className='text-base/7 text-secondary-light dark:text-secondary-dark'>
                    {stat.label}
                  </dt>
                  <dd className='text-3xl font-semibold tracking-tight text-primary-light dark:text-primary-dark'>
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Image section */}
        <div className='mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8'>
          <img
            alt='Travel team exploring a destination'
            src='/about.avif'
            className='aspect-[9/4] w-full object-cover xl:rounded-3xl'
          />
        </div>

        {/* Values section */}
        <div className='mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-pretty text-4xl font-semibold tracking-tight text-primary-light dark:text-text-dark sm:text-5xl'>
              Our Travel Philosophy
            </h2>
            <p className='mt-6 text-lg/8 text-secondary-light dark:text-secondary-dark'>
              These principles guide every journey we create and every traveler we serve.
            </p>
          </div>
          <dl className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-secondary-light dark:text-secondary-dark sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16'>
            {values.map((value) => (
              <div key={value.name} className='relative pl-9'>
                <dt className='inline font-semibold text-primary-light dark:text-primary-dark'>
                  <value.icon
                    aria-hidden='true'
                    className='absolute left-1 top-1 size-5 text-primary-light dark:text-primary-dark'
                  />
                  {value.name}
                </dt>{' '}
                <dd className='inline'>{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Team section */}
        <div className='mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-pretty text-4xl font-semibold tracking-tight text-primary-light dark:text-text-dark sm:text-5xl'>
              Meet Our Guides
            </h2>
            <p className='mt-6 text-lg/8 text-secondary-light dark:text-secondary-dark'>
              A global team of travel experts who live and breathe their destinations.
            </p>
          </div>
          <ul
            role='list'
            className='mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4'
          >
            {team.map((person) => (
              <li key={person.name}>
                <img
                  alt={person.name}
                  src={person.imageUrl}
                  className='aspect-[14/13] w-full rounded-2xl object-cover'
                />
                <h3 className='mt-6 text-lg/8 font-semibold tracking-tight text-primary-light dark:text-text-dark'>
                  {person.name}
                </h3>
                <p className='text-base/7 text-primary-light dark:text-primary-dark'>
                  {person.role}
                </p>
                <p className='text-sm/6 text-secondary-light dark:text-secondary-dark'>
                  {person.location}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
