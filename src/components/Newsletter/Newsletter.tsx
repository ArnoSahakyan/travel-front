export const Newsletter = () => {
  return (
    <div className='py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='relative isolate flex flex-col gap-10 overflow-hidden bg-primary-light dark:bg-primary-dark/40 px-6 py-16 shadow-lg sm:rounded-2xl sm:px-16 xl:flex-row xl:items-center xl:py-24'>
          {/* Background pattern */}
          <div className='absolute inset-0 -z-10 overflow-hidden'>
            <svg
              className='absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-white/10 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]'
              aria-hidden='true'
            >
              <defs>
                <pattern
                  id='1d4240c1-9a55-448f-bd5e-8e7e6a1e8b6d'
                  width={200}
                  height={200}
                  x='50%'
                  y={0}
                  patternUnits='userSpaceOnUse'
                >
                  <path d='M.5 200V.5H200' fill='none' />
                </pattern>
              </defs>
              <rect
                width='100%'
                height='100%'
                strokeWidth={0}
                fill='url(#1d4240c1-9a55-448f-bd5e-8e7e6a1e8b6d)'
              />
            </svg>
          </div>

          {/* Content */}
          <div className='xl:flex-auto'>
            <h2 className='max-w-xl text-balance text-3xl font-semibold tracking-tight text-background-light sm:text-4xl'>
              Get exclusive travel deals and updates
            </h2>
            <p className='mt-4 text-lg leading-8 text-background-light/90'>
              Join our newsletter for curated travel inspiration and special offers
            </p>
          </div>

          {/* Form */}
          <form className='w-full max-w-md'>
            <div className='flex gap-x-4'>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                required
                placeholder='Enter your email'
                autoComplete='email'
                className='min-w-0 flex-auto rounded-md bg-background-light/10 px-3.5 py-2.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/20 placeholder:text-white/70 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-white sm:text-sm/6'
              />
              <button
                type='submit'
                className='flex-none rounded-md bg-background-light px-3.5 py-2.5 text-sm font-semibold text-primary-light shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors'
              >
                Subscribe
              </button>
            </div>
            <p className='mt-3 text-sm text-white/80'>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
