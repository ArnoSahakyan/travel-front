const AdminHomePage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4 py-12'>
      <div className='max-w-2xl text-center space-y-6'>
        <h1 className='text-4xl font-bold text-primary-light dark:text-text-dark'>
          Welcome to the Admin Panel
        </h1>
        <p className='text-lg text-secondary-light dark:text-secondary-dark'>
          This is the administrative dashboard for the WanderLuxe travel website. From here, you can
          manage content, monitor performance, send newsletters, and more.
        </p>
        <p className='text-sm text-secondary-light dark:text-secondary-dark'>
          Use the sidebar or navigation to access different sections such as Tours, Destinations,
          Blogs, Bookings, and Newsletter.
        </p>
      </div>
    </div>
  );
};

export default AdminHomePage;
