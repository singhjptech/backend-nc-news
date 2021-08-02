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

// exports.mapArticles = (articleData) => {
//   return articleData.map()
// }