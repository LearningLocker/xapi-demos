const transformComments = (comments) => {
  return comments.map((comment) => {
    return {
      actor: {
        objectType: 'Agent',
        mbox: `mailto:${comment.email}`,
      },
      verb: {
        id: 'https://w3id.org/xapi/acrossx/verbs/posted',
        display: {
          'en': 'posted',
        },
      },
      object: {
        objectType: 'Activity',
        id: `https://jsonplaceholder.typicode.com/comments/${comment.id}`,
        definition: {
          type: 'http://activitystrea.ms/schema/1.0/comment',
          name: {
            'en': 'a comment'
          },
        },
      },
      result: {
        response: comment.body,
      },
      context: {
        contextActivities: {
          parent: [{
            objectType: 'Activity',
            id: `https://jsonplaceholder.typicode.com/posts/${comment.postId}`,
            definition: {
              type: 'http://id.tincanapi.com/activitytype/forum-topic',
            },
          }],
        },
        extensions: {
          'https://learninglocker.net/extensions/info': {
            etlVersion: '1.0.0',
            sourceVersion: '1.0.0',
          },
        },
      },
      timestamp: (new Date()).toISOString(),
    };
  });
};

module.exports = transformComments;
