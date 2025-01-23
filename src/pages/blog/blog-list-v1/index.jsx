

import BlogList from "@/components/blog-meu-pages/blog-list-v1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Blog List V1 || Rugby Transfer Market",
  description: "Rugby Transfer Market",
};
const BlogListpage1 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <BlogList />
    </>
  );
};

export default BlogListpage1
