import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { faqs } from '../../assets/data/faq.ts';

export const FaqPage = () => {
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
