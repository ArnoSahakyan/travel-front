import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';
import { LegalSection } from '../../shared/types';
import { termsAndConditions } from '../../assets';

export const LegalPage = () => {
  const renderSection = (section: LegalSection) => (
    <div className='mt-8' key={section.title}>
      <h2 className='text-2xl font-semibold text-primary-light dark:text-primary-dark'>
        {section.title}
      </h2>
      <p className='mt-4'>{section.content}</p>

      {section.subsections?.map((subsection) => (
        <div key={subsection.title} className='mt-4'>
          <h3 className='text-xl font-semibold text-primary-light dark:text-primary-dark'>
            {subsection.title}
          </h3>
          <p className='mt-2'>{subsection.content}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className='bg-background-light dark:bg-background-dark'>
      <div className='mx-auto max-w-7xl px-6 pt-16 sm:pt-24 lg:px-8 lg:pt-32'>
        <div className='mx-auto max-w-4xl'>
          <h1 className='text-4xl font-semibold tracking-tight text-primary-light dark:text-text-dark sm:text-5xl'>
            Terms & Conditions / Privacy Policy
          </h1>
          <p className='mt-6 text-lg text-secondary-light dark:text-secondary-dark'>
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className='prose prose-lg mt-12 text-secondary-light dark:prose-invert dark:text-secondary-dark'>
            {termsAndConditions.map(renderSection)}

            <div className='mt-16 border-t border-primary-light/20 dark:border-primary-dark/20 pt-8'>
              <p className='text-secondary-light dark:text-secondary-dark'>
                For questions about these policies, please contact us at{' '}
                <a
                  href='mailto:legal@wanderluxe.com'
                  className='text-primary-light dark:text-primary-dark hover:underline'
                >
                  legal@wanderluxe.com
                </a>{' '}
                or visit our{' '}
                <Link
                  to={ROUTES.CONTACT}
                  className='text-primary-light dark:text-primary-dark hover:underline'
                >
                  Contact Page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
