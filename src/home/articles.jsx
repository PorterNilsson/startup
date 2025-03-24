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

  const articleFeed = [];
  if (recentArticlesFeed.length) {
    for (const [i, article] of recentArticlesFeed.entries()) {
      articleFeed.push(
        <div className="article">
          <img src={`nature_${i + 1}.jpg`} width="10%" className="img" />
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
