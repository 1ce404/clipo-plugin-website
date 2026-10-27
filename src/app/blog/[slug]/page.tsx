import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleIntro } from "@/components/blog/ArticleIntro";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { PostCover } from "@/components/blog/PostCover";
import { adjacentPosts, getPost, posts } from "@/content/posts";
import { formatChineseDate } from "@/lib/date";
import { articleJsonLd, serializeJsonLd } from "../../structured-data";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.date },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { newer, older } = adjacentPosts(slug);
  const more = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="blog" id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd(post)) }}
      />
      <article className="wrap article">
        <Link href="/blog" className="back">
          ← 全部文章
        </Link>
        <ArticleIntro>
          <p className="post-meta">
            {post.tag}，<time dateTime={post.date}>{formatChineseDate(post.date)}</time>，{post.minutes}{" "}
            分钟读完
          </p>
          <h1 className="article-title">{post.title}</h1>
          <p className="article-sum">{post.summary}</p>
          <PostCover post={post} size="large" showTitle={false} />
        </ArticleIntro>
        <PostBody blocks={post.body} />
        <nav className="article-next" aria-label="上一篇和下一篇">
          {newer && (
            <Link href={`/blog/${newer.slug}`}>
              <span>较新</span>
              {newer.title}
            </Link>
          )}
          {older && (
            <Link href={`/blog/${older.slug}`} className="next">
              <span>较早</span>
              {older.title}
            </Link>
          )}
        </nav>
      </article>
      <section className="wrap more" aria-labelledby="more-title">
        <h2 className="more-h" id="more-title">
          继续阅读
        </h2>
        <div className="post-grid">
          {more.map((p) => (
            <PostCard key={p.slug} post={p} showSummary={false} />
          ))}
        </div>
      </section>
    </main>
  );
}
