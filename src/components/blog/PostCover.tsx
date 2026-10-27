import { pluginByKey } from "@/content/plugins";
import { coverTint, type Post } from "@/content/posts";

type PostCoverProps = {
  post: Post;
  size?: "card" | "large";
  /** 文章页的大封面已有标题在上方，这里只放装饰。 */
  showTitle?: boolean;
};

export function PostCover({ post, size = "card", showTitle = true }: PostCoverProps) {
  const [from, to] = coverTint[post.tag];
  return (
    <div
      className={`post-cover ${size === "large" ? "big" : ""}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <span className="pc-tag">{post.tag}</span>
      {post.plugin && <span className={`pc-plugin t-${post.plugin}`}>{pluginByKey[post.plugin].name}</span>}
      {showTitle ? (
        <span className="pc-title" aria-hidden="true">
          {post.title}
        </span>
      ) : (
        <span className="pc-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      )}
    </div>
  );
}
