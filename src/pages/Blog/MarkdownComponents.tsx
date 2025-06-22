// import type { Components } from 'react-markdown';
// import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';
//
// // @ts-expect-error - ReactMarkdown doesn't have proper types for components
// export const MarkdownComponents: Components = {
//   h2: ({ ...props }: ReactMarkdownProps) => (
//     <h2
//       className='text-2xl font-bold mt-12 mb-6 text-primary-light dark:text-primary-dark border-b border-gray-200 dark:border-gray-700 pb-2'
//       {...props}
//     />
//   ),
//   h3: ({ ...props }: ReactMarkdownProps) => (
//     <h3
//       className='text-xl font-semibold mt-8 mb-4 text-primary-light dark:text-primary-dark'
//       {...props}
//     />
//   ),
//   p: (props) => (
//     <p className='mb-6 text-secondary-light dark:text-secondary-dark leading-relaxed' {...props} />
//   ),
//   a: (props) => (
//     <a className='text-accent-light dark:text-accent-dark hover:underline' {...props} />
//   ),
//   ul: (props) => (
//     <ul
//       className='list-disc pl-6 mb-6 space-y-2 text-secondary-light dark:text-secondary-dark'
//       {...props}
//     />
//   ),
//   ol: (props) => (
//     <ol
//       className='list-decimal pl-6 mb-6 space-y-2 text-secondary-light dark:text-secondary-dark'
//       {...props}
//     />
//   ),
//   li: (props) => <li className='mb-1' {...props} />,
//   img: (props) => (
//     <div className='my-8'>
//       <img className='rounded-lg w-full h-auto shadow-md' {...props} alt='blog image' />
//     </div>
//   ),
//   table: (props) => (
//     <div className='overflow-x-auto my-6'>
//       <table className='min-w-full border border-gray-200 dark:border-gray-700' {...props} />
//     </div>
//   ),
//   th: (props) => (
//     <th
//       className='px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-left'
//       {...props}
//     />
//   ),
//   td: (props) => (
//     <td className='px-4 py-2 border border-gray-200 dark:border-gray-600' {...props} />
//   ),
// };
