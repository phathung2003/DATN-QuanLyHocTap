import SingleBlog from '@/components/Blog/SingleBlog';
import blogData from '@/components/Blog/blogData';
import Breadcrumb from '@/components/Common copy/Breadcrumb';
import Pagination from '@/components/Pagination/Pagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Page | Free Next.js Template for Startup and SaaS',
  description: 'This is Blog Page for Startup Nextjs Template',
  // other metadata
};

const Blog = () => {
  return (
    <>
      <Breadcrumb
        pageName="Bài viết"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <section className="px-20 pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogData.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>

          {/*  pagination */}
          <Pagination />
        </div>
      </section>
    </>
  );
};

export default Blog;
