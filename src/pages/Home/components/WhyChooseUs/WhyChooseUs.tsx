import {
  CheckCircleIcon,
  GlobeAltIcon,
  HeartIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Curated Experiences',
    description: 'We handpick every tour to ensure authentic, unforgettable travel moments',
    icon: GlobeAltIcon,
    color: 'text-primary-light dark:text-primary-dark',
  },
  {
    name: 'Local Experts',
    description:
      "Our guides are destination natives who know hidden gems you won't find in guidebooks",
    icon: HeartIcon,
    color: 'text-accent-light dark:text-accent-dark',
  },
  {
    name: 'Hassle-Free Travel',
    description: 'From visas to transfers, we handle all logistics so you can focus on enjoying',
    icon: CheckCircleIcon,
    color: 'text-secondary-light dark:text-secondary-dark',
  },
  {
    name: 'Best Value Guarantee',
    description: 'We negotiate directly with providers to offer premium experiences at fair prices',
    icon: ShieldCheckIcon,
    color: 'text-primary-light dark:text-text-dark',
  },
];

export const WhyChooseUs = () => {
  return (
    <section className='relative bg-background-light dark:bg-background-dark py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-primary-light dark:text-text-dark sm:text-4xl'>
            Why Choose WanderLuxe
          </h2>
          <p className='mt-4 text-lg text-secondary-light dark:text-secondary-dark'>
            We don't just plan trips - we craft journeys that stay with you forever
          </p>
        </div>

        <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature) => (
            <div
              key={feature.name}
              className='flex flex-col rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-md transition-all'
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg ${feature.color}`}
              >
                <feature.icon className='h-8 w-8' aria-hidden='true' />
              </div>
              <h3 className='text-lg font-semibold leading-7 text-primary-light dark:text-text-dark'>
                {feature.name}
              </h3>
              <p className='mt-2 text-base leading-6 text-secondary-light dark:text-secondary-dark'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className='mt-24 rounded-2xl bg-gradient-to-t from-white to-white/30 dark:from-primary-dark/20 dark:to-gray-800/30 p-8 sm:p-12'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
            <div className='text-center'>
              <p className='text-4xl font-bold text-primary-light dark:text-primary-dark'>10K+</p>
              <p className='mt-2 text-sm font-medium text-secondary-light dark:text-secondary-dark'>
                Happy Travelers
              </p>
            </div>
            <div className='text-center'>
              <p className='text-4xl font-bold text-accent-light dark:text-accent-dark'>150+</p>
              <p className='mt-2 text-sm font-medium text-secondary-light dark:text-secondary-dark'>
                Unique Destinations
              </p>
            </div>
            <div className='text-center'>
              <p className='text-4xl font-bold text-primary-light dark:text-text-dark'>98%</p>
              <p className='mt-2 text-sm font-medium text-secondary-light dark:text-secondary-dark'>
                Satisfaction Rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
