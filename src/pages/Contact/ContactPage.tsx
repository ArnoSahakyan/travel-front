import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon, MapIcon } from '@heroicons/react/24/outline';

export const ContactPage = () => {
  return (
    <div className='relative isolate bg-background-light dark:bg-background-dark flex-1'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2'>
        {/* Contact Information Section */}
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
              Our travel experts are ready to help you plan your perfect trip. Contact us for
              personalized itineraries, questions about our tours, or travel advice.
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

        {/* Contact Form Section */}
        <form action='#' method='POST' className='px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48'>
          <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
            <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
              <div>
                <label
                  htmlFor='first-name'
                  className='block text-sm/6 font-semibold text-primary-light dark:text-text-dark'
                >
                  First name
                </label>
                <div className='mt-2.5'>
                  <input
                    id='first-name'
                    name='first-name'
                    type='text'
                    autoComplete='given-name'
                    className='block w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-primary-light dark:text-text-dark outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-light dark:focus:outline-primary-dark'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='last-name'
                  className='block text-sm/6 font-semibold text-primary-light dark:text-text-dark'
                >
                  Last name
                </label>
                <div className='mt-2.5'>
                  <input
                    id='last-name'
                    name='last-name'
                    type='text'
                    autoComplete='family-name'
                    className='block w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-primary-light dark:text-text-dark outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-light dark:focus:outline-primary-dark'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='email'
                  className='block text-sm/6 font-semibold text-primary-light dark:text-text-dark'
                >
                  Email
                </label>
                <div className='mt-2.5'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    className='block w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-primary-light dark:text-text-dark outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-light dark:focus:outline-primary-dark'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='phone-number'
                  className='block text-sm/6 font-semibold text-primary-light dark:text-text-dark'
                >
                  Phone number
                </label>
                <div className='mt-2.5'>
                  <input
                    id='phone-number'
                    name='phone-number'
                    type='tel'
                    autoComplete='tel'
                    className='block w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-primary-light dark:text-text-dark outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-light dark:focus:outline-primary-dark'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='message'
                  className='block text-sm/6 font-semibold text-primary-light dark:text-text-dark'
                >
                  Message
                </label>
                <div className='mt-2.5'>
                  <textarea
                    id='message'
                    name='message'
                    rows={4}
                    className='block resize-none w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-primary-light dark:text-text-dark outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-light dark:focus:outline-primary-dark'
                    placeholder='Tell us about your travel plans...'
                  />
                </div>
              </div>
            </div>

            <div className='mt-8 flex justify-end'>
              <button
                type='submit'
                className='rounded-md bg-primary-light dark:bg-primary-dark px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark transition-colors'
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
