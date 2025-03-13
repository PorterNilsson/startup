import React from "react";

export function Articles() {
  const [recentArticlesFeed, setRecentArticlesFeed] = React.useState([]);

  React.useEffect(() => {
    // Should be a service call to database to get the recent articles
    setRecentArticlesFeed(["Article 1", "Article 2", "Article 3"]);
  }, []);

  const articleFeed = [];
  if (recentArticlesFeed.length) {
    for (const [i, article] of recentArticlesFeed.entries()) {
      articleFeed.push(
        <div className="article">
          <img src={`nature_${i + 1}.jpg`} width="10%" className="img" />
          <div className="article-content">
            <h3>{article}</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
              minima asperiores atque repudiandae aliquam architecto animi,
              voluptates, quas dolore impedit odio beatae? Veniam, pariatur amet
              eos itaque assumenda deserunt consequatur sapiente eveniet maiores
              magni aperiam, porro natus nemo, officiis earum?
            </p>
          </div>
        </div>
      );
    }
  } else {
    articleFeed.push(<p>No recent articles.</p>);
  }

  return <div className="articles">{articleFeed}</div>;
}
