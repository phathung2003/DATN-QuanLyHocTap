import SingleBlog from '@/components/page/homepage/blog/singleBlog';
import blogData from '@/components/page/homepage/blog/blogData';
import Breadcrumb from '@/components/Main/breadcrumb';
import Pagination from '@/components/element/other/pagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trang bài viết',
  description: 'Đây là trang bài viết',
  // other metadata
};

const Blog = () => {
  return (
    <>
      <Breadcrumb
        pageName="Bài đăng"
        description="Đây là những bài đăng của page"
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
