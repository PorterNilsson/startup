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
      console.log(article);
      articleFeed.push(
        <div className="article" key={i} >
          <img src={`${article.image}.jpg`} width="10%" className="img" />
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
