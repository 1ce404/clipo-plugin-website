import Link from "next/link";
import type { Post } from "@/content/posts";
import { formatChineseDate } from "@/lib/date";
import { PostCover } from "./PostCover";

export function PostCard({ post, showSummary = true }: { post: Post; showSummary?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      <PostCover post={post} />
      <div className="post-card-body">
        <time className="post-meta" dateTime={post.date}>
          {formatChineseDate(post.date)}
        </time>
        <h3>{post.title}</h3>
        {showSummary && <p>{post.summary}</p>}
      </div>
    </Link>
  );
}

export function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-feature">
      <PostCover post={post} size="large" />
      <div className="pf-body">
        <span className="post-meta">
          <time dateTime={post.date}>{formatChineseDate(post.date)}</time>，{post.minutes} 分钟读完
        </span>
        <h2>{post.title}</h2>
        <p>{post.summary}</p>
        <span className="read-more">阅读全文</span>
      </div>
    </Link>
  );
}
