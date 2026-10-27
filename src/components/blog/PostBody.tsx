import type { Block } from "@/content/posts";

/** 把结构化的文章正文渲染成语义化 HTML。 */
export function PostBody({ blocks }: { blocks: readonly Block[] }) {
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "quote":
            return <blockquote key={i}>{block.text}</blockquote>;
          case "list":
            return (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre key={i}>
                <code>{block.text}</code>
              </pre>
            );
          case "p":
            return <p key={i}>{block.text}</p>;
        }
      })}
    </div>
  );
}
