import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: "博客",
  description: "Clipo 的产品思考、方法和案例：怎么让你的 Agent 做好营销内容。",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="blog" id="main">
      <div className="wrap">
        <BlogIndex />
      </div>
    </main>
  );
}
