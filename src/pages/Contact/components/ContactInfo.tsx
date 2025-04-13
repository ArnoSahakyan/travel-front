import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon, MapIcon } from '@heroicons/react/24/outline';

export const ContactInfo = () => (
  <div className='relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48'>
    <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-lg'>
      <div className='absolute inset-y-0 left-0 -z-10 w-full overflow-hidden lg:w-1/2'>
        <svg
          aria-hidden='true'
          className='absolute inset-0 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
        >
          <defs>
            <pattern
              id='pattern'
              x='100%'
              y={-1}
              width={200}
              height={200}
              patternUnits='userSpaceOnUse'
            >
              <path d='M130 200V.5M.5 .5H200' fill='none' />
            </pattern>
          </defs>
          <rect
            width='100%'
            height='100%'
            strokeWidth={0}
            fill='url(#light-gradient)'
            className='dark:hidden'
          />
          <rect
            width='100%'
            height='100%'
            strokeWidth={0}
            fill='url(#dark-gradient)'
            className='hidden dark:block'
          />
          <svg x='100%' y={-1} className='overflow-visible'>
            <path
              d='M-470.5 0h201v201h-201Z'
              strokeWidth={0}
              fill='url(#light-gradient)'
              className='dark:hidden'
            />
            <path
              d='M-470.5 0h201v201h-201Z'
              strokeWidth={0}
              fill='url(#dark-gradient)'
              className='hidden dark:block'
            />
          </svg>
          <defs>
            <linearGradient id='light-gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stopColor='#2A7A7B' stopOpacity='0.1' />
              <stop offset='50%' stopColor='#D4A96A' stopOpacity='0.1' />
              <stop offset='100%' stopColor='#F5F7FA' stopOpacity='0.1' />
            </linearGradient>
            <linearGradient id='dark-gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stopColor='#1BA098' stopOpacity='0.2' />
              <stop offset='50%' stopColor='#DEB992' stopOpacity='0.2' />
              <stop offset='100%' stopColor='#081521' stopOpacity='0.2' />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <h2 className='text-pretty text-4xl font-semibold tracking-tight text-primary-light dark:text-text-dark sm:text-5xl'>
        Start Your Next Adventure
      </h2>
      <p className='mt-6 text-lg/8 text-secondary-light dark:text-secondary-dark'>
        Our travel experts are ready to help you plan your perfect trip. Contact us for personalized
        itineraries, questions about our tours, or travel advice.
      </p>

      <dl className='mt-10 space-y-4 text-base/7 text-secondary-light dark:text-secondary-dark'>
        <div className='flex gap-x-4'>
          <dt className='flex-none'>
            <span className='sr-only'>Address</span>
            <MapIcon className='h-7 w-6 text-primary-light dark:text-primary-dark' />
          </dt>
          <dd>
            123 Explorer Lane
            <br />
            Denver, CO 80202
          </dd>
        </div>

        <div className='flex gap-x-4'>
          <dt className='flex-none'>
            <span className='sr-only'>Telephone</span>
            <PhoneIcon className='h-7 w-6 text-primary-light dark:text-primary-dark' />
          </dt>
          <dd>
            <a
              href='tel:+1 (800) 555-ADVENTURE'
              className='hover:text-primary-light dark:hover:text-primary-dark transition-colors'
            >
              +1 (800) 555-ADVENTURE
            </a>
          </dd>
        </div>

        <div className='flex gap-x-4'>
          <dt className='flex-none'>
            <span className='sr-only'>Email</span>
            <EnvelopeIcon className='h-7 w-6 text-primary-light dark:text-primary-dark' />
          </dt>
          <dd>
            <a
              href='mailto:bookings@wanderluxe.com'
              className='hover:text-primary-light dark:hover:text-primary-dark transition-colors'
            >
              bookings@wanderluxe.com
            </a>
          </dd>
        </div>

        <div className='flex gap-x-4'>
          <dt className='flex-none'>
            <span className='sr-only'>Office Hours</span>
            <BuildingOffice2Icon className='h-7 w-6 text-primary-light dark:text-primary-dark' />
          </dt>
          <dd>
            Monday - Friday: 9AM - 6PM MST
            <br />
            Saturday: 10AM - 4PM MST
          </dd>
        </div>
      </dl>
    </div>
  </div>
);
