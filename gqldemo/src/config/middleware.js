const path = require('path');
const isDev = think.env === 'development';
const graphql = require('../apollo');
const { makeExecutableSchema } = require('graphql-tools');
const Schema = require('../graphql/schema');
const Resolvers = require('../graphql/resolvers');
const Connectors = require('../graphql/connectors');
const kcors = require('kcors');

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: kcors, // 全局处理跨域，所有请求都会允许跨域，如果想要进行相关配置请看kcors文档进行配置
    options: {
      origin: '*',
      credentials: true,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    match: '/graphql',
    handle: graphql,
    options: {
      schema: makeExecutableSchema({
        typeDefs: Schema,
        resolvers: Resolvers
      }),
      context: {
        db: Connectors
      }
    }
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
