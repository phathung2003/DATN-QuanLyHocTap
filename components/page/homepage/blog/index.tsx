import SectionTitle from '@/components/Main/sectionTitle';
import SingleBlog from '@/components/page/homepage/blog/singleBlog';
import BlogData from '@/components/page/homepage/blog/blogData';

const Blog = () => {
  return (
    <section
      id="blog"
      className="bg-[#FFEFEF] px-20 py-8 dark:bg-slate-800 md:py-12 lg:py-16"
    >
      <div className="container">
        <SectionTitle
          title="Bài viết mới nhất"
          paragraph="Một môi trường năng động & hiệu quả khi các bé được học tập & yêu thương đúng cách"
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {BlogData.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
