"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { ALL_POSTS, filterPosts, postFilters, type PostFilter } from "@/content/posts";
import { ease } from "@/lib/motion";
import { FilterTabs } from "../FilterTabs";
import { FeaturedPost, PostCard } from "./PostCard";

/** 博客列表：第一篇作为头条，其余排成网格，可按分类筛选。 */
export function BlogIndex() {
  const [filter, setFilter] = useState<PostFilter>(ALL_POSTS);
  const [first, ...rest] = filterPosts(filter);

  return (
    <>
      <header className="blog-top">
        <h1 className="blog-h1">博客</h1>
        <FilterTabs
          id="post-filter"
          label="文章分类"
          options={postFilters}
          value={filter}
          onChange={setFilter}
        />
      </header>

      <LayoutGroup>
        <AnimatePresence mode="popLayout" initial={false}>
          {first && (
            <motion.div
              key={first.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <FeaturedPost post={first} />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div layout className="post-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {rest.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {!first && <p className="blog-empty">这个分类还没有文章。</p>}
    </>
  );
}
