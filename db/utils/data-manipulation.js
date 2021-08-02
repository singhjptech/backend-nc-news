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

exports.formatArticlesData = (articleData, slugs) => {
  const result = [];

  articleData.forEach((article) => {
    let topicId = 
    slugs.forEach(slug => {
      if (slug.slug === article.)
    })
    return [
      article.title,
      article.body,
      article.votes,
      article.topic,
      article.author,
      article.created_at,
    ];
  });
};

exports.mapComments = (commentData) => {
  return commentData.map((comment) => {
    return [comment.votes, comment.created_at, comment.body];
  });
};
