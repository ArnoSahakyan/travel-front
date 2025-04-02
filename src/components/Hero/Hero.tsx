export const Hero = () => {
  return (
    <div className='relative bg-background-light dark:bg-background-dark'>
      <div className='mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8'>
        <div className='px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-40 lg:pb-48 xl:col-span-6'>
          <div className='mx-auto max-w-lg lg:mx-0'>
            <h1 className='mt-24 text-5xl font-semibold tracking-tight text-pretty text-text-light dark:text-text-dark sm:mt-10 sm:text-7xl'>
              Explore the world with us
            </h1>
            <p className='mt-8 text-lg font-medium text-pretty text-secondary-light dark:text-secondary-dark sm:text-xl/8'>
              Your dream vacation is just a click away. We specialize in creating unforgettable
              travel experiences tailored to your desires.
            </p>
            <div className='mt-10 flex items-center gap-x-6'>
              <a
                href='#'
                className='rounded-md bg-primary-light px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:bg-primary-dark dark:hover:bg-primary-light dark:focus-visible:outline-primary-dark'
              >
                Book your trip
              </a>
              <a href='#' className='text-sm/6 font-semibold text-text-light dark:text-text-dark'>
                Explore destinations <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>
        </div>
        <div className='relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0'>
          <img
            alt='Beautiful beach destination'
            src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80'
            className='aspect-3/2 w-full bg-gray-100 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full dark:bg-gray-800'
          />
        </div>
      </div>
    </div>
  );
};
