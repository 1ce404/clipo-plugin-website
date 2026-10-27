import Link from "next/link";

export default function NotFound() {
  return (
    <main className="blog" id="main">
      <div className="wrap article">
        <h1 className="article-title">找不到这个页面</h1>
        <p className="article-sum">链接可能已经失效，或者页面已经移动。</p>
        <Link href="/" className="btn">
          回到首页
        </Link>
      </div>
    </main>
  );
}
