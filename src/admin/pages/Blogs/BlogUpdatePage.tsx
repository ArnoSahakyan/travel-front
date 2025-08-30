import { BlogForm } from './components';
import { useParams } from 'react-router-dom';

const BlogUpdatePage = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return null;

  return (
    <div className='p-6'>
      <BlogForm blogSlug={slug} />
    </div>
  );
};

export default BlogUpdatePage;
