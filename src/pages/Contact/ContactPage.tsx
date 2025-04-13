import { ContactForm, ContactInfo } from './components';

export const ContactPage = () => {
  return (
    <div className='relative isolate bg-background-light dark:bg-background-dark flex-1'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2'>
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
};
