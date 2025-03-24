import React from "react";

export function Articles() {
  const [recentArticlesFeed, setRecentArticlesFeed] = React.useState([]);

  React.useEffect(() => {

    fetch('/api/articles')
      .then((response) => response.json())
      .then((articles) => {
        setRecentArticlesFeed(articles);
      });
    
  }, []);

  // Currently the image is just a modulo of the article number, but the article returned from the fetch request could just as easily return an image name.
  // However, I want to wait until we implement the database calls to actually decide on a final naming scheme with an associated directory structure for those static files
  const articleFeed = [];
  if (recentArticlesFeed.length) {
    for (const [i, article] of recentArticlesFeed.entries()) {
      articleFeed.push(
        <div className="article">
          <img src={`nature_${(i % 3) + 1}.jpg`} width="10%" className="img" />
          <div className="article-content">
            <h3>{ article.title }</h3>
            <p>
              { article.content }
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
