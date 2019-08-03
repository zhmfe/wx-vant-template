'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_PREFIX: '"/admin"',
  ROUTER_BASE:'"/"',
  ROUTER_HISTORY:'"hash"'
})
