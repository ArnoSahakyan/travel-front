export const NewsletterContent = () => (
  <>
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

    <div className='xl:flex-auto'>
      <h2 className='max-w-xl text-balance text-3xl font-semibold tracking-tight text-background-light sm:text-4xl'>
        Get exclusive travel deals and updates
      </h2>
      <p className='mt-4 text-lg leading-8 text-background-light/90'>
        Join our newsletter for curated travel inspiration and special offers
      </p>
    </div>
  </>
);
