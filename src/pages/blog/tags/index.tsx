import React from "react";
import Layout from "../../../components/layout";

export default function TaggedBlogPosts({ data }) {
  return (
    <Layout>
      <div className="px-8">
        <div className="summary">
          <div className="title">
            <p>A place to share my thoughts</p>
          </div>
        </div>
        Tags...
      </div>
    </Layout>
  );
}
