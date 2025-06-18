import { partners } from '../../../../assets';

export const TrustedPartners = () => {
  return (
    <div className='bg-background-light dark:bg-background-dark py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <h2 className='text-center text-lg/8 font-semibold text-primary-light dark:text-text-dark'>
          Trusted by travelers and industry leaders
        </h2>
        <div className='mx-auto mt-10 grid max-w-lg grid-cols-2 justify-center items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4'>
          {partners.map((partner) => (
            <img
              key={partner.name}
              alt={partner.name}
              src={partner.logo}
              width={partner.width}
              height={partner.height}
              className='col-span-1 grayscale max-h-12 w-full object-contain opacity-70 hover:opacity-100 transition-opacity'
            />
          ))}
        </div>
      </div>
    </div>
  );
};
