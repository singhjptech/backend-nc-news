// extract any functions you are using to manipulate your data, into this file
exports.mapTopic = (topicData) => {
  return topicData.map((topic) => {
    return [topic.slug, topic.description];
  });
};

exports.mapUsers = (userData) => {
  return userData.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });
};

exports.formatArticlesData = (articleData) => {
  return articleData.map((article) => {
    if (Object.keys(article).includes("votes")) {
      return [
        article.title,
        article.body,
        article.votes,
        article.topic,
        article.author,
        article.created_at,
      ];
    } else {
      return [
        article.title,
        article.body,
        0,
        article.topic,
        article.author,
        article.created_at,
      ];
    }
  });
};

exports.formatComments = (commentData, articleRef) => {
  let commentWithArticle = [];

  commentData.forEach((comment) => {
    articleRef.forEach((article) => {
      if (comment.belongs_to === article.title) {
        commentWithArticle.push([
          comment.created_by,
          article.article_id,
          comment.votes,
          comment.created_at,
          comment.body,
        ]);
      }
    });
  });
  return commentWithArticle;
};
