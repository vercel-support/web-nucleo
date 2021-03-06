const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const withOptimizedImages = require('next-optimized-images');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
);

const webpackObj = withOptimizedImages(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) {
              return callback();
            }
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        });
      }
      return config;
    },
  })
);

webpackObj['rewrites'] = async function() {
  return [
    {
      source: '/blog/wp-admin',
      destination: 'https://blog.inmobiliarianucleo.com/blog/wp-admin/index.php',
    },
    {
      source: '/blog/:path*',
      destination: 'https://blog.inmobiliarianucleo.com/blog/:path*',
    },
  ]
}

module.exports = webpackObj;
