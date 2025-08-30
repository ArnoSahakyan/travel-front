const UserProfilePage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4 py-12'>
      <div className='max-w-2xl text-center space-y-6'>
        <h1 className='text-4xl font-bold text-primary-light dark:text-text-dark'>
          Welcome to Your Profile
        </h1>
        <p className='text-lg text-secondary-light dark:text-secondary-dark'>
          This is your personal profile management area on WanderLuxe. From here, you can update
          your information, manage bookings, and customize your experience.
        </p>
        <p className='text-sm text-secondary-light dark:text-secondary-dark'>
          Use the navigation menu to edit your personal details, view past and upcoming bookings,
          manage your favorite destinations, and adjust your preferences.
        </p>
      </div>
    </div>
  );
};

export default UserProfilePage;
