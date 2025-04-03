import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'How far in advance should I book my trip?',
    answer:
      'We recommend booking at least 3-6 months in advance for international trips and 1-3 months for domestic travel. Popular destinations and peak seasons fill up quickly, so earlier bookings ensure better availability and prices.',
  },
  {
    question: "What's included in your tour packages?",
    answer:
      "Our packages typically include accommodations, guided tours, transportation between destinations, and some meals. Specific inclusions vary by package - full details are listed on each tour page. We're always transparent about what's included and what's extra.",
  },
  {
    question: 'Do you offer travel insurance?',
    answer:
      'Yes, we partner with top travel insurance providers to offer comprehensive coverage options. We strongly recommend insurance to protect your investment against unexpected cancellations, medical emergencies, and travel disruptions.',
  },
  {
    question: 'Can you accommodate dietary restrictions?',
    answer:
      "Absolutely! We work with all our partners to accommodate dietary needs. Just inform us during booking about any allergies, restrictions, or preferences, and we'll ensure your culinary experiences meet your requirements.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "Our standard policy allows cancellations up to 60 days before departure for a full refund (minus a small processing fee). Closer to departure, refund amounts vary - details are provided during booking. We also offer 'Cancel for Any Reason' insurance upgrades.",
  },
  {
    question: 'How do you ensure sustainable travel practices?',
    answer:
      "We carefully select eco-conscious partners, limit group sizes to reduce impact, offset carbon emissions for all trips, and follow 'leave no trace' principles. A portion of every booking supports local conservation efforts in our destinations.",
  },
];

export const FAQ = () => {
  return (
    <div className='bg-background-light dark:bg-background-dark'>
      <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='text-4xl font-semibold tracking-tight text-text-light dark:text-text-dark sm:text-5xl'>
            Travel Questions Answered
          </h2>
          <dl className='mt-16 divide-y divide-primary-light/20 dark:divide-primary-dark/20'>
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as='div' className='py-6 first:pt-0 last:pb-0'>
                <dt>
                  <DisclosureButton className='group flex w-full items-start justify-between text-left text-text-light dark:text-text-dark'>
                    <span className='text-primary-light dark:text-primary-dark text-lg font-semibold'>
                      {faq.question}
                    </span>
                    <span className='ml-6 flex h-7 items-center'>
                      <PlusIcon
                        aria-hidden='true'
                        className='size-6 text-primary-light dark:text-primary-dark group-data-[open]:hidden'
                      />
                      <MinusIcon
                        aria-hidden='true'
                        className='size-6 text-primary-light dark:text-primary-dark group-[&:not([data-open])]:hidden'
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as='dd' className='mt-2 pr-12'>
                  <p className='text-base text-secondary-light dark:text-secondary-dark'>
                    {faq.answer}
                  </p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
