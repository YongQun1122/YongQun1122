const path = require("path");
const withLess = require("next-with-less");
const withPWA = require("next-pwa");
const antdLessFile = path.resolve(__dirname, "./styles/antd.less");

module.exports = withPWA(
  withLess({
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === "development"
    },
    eslint: {
      ignoreDuringBuilds: false
    },
    typescript: {
      ignoreBuildErrors: false
    },
    images: {
      domains: ["images.mycravy.com", "d1wshhln2jshdb.cloudfront.net"],
      disableStaticImages: true
    },
    lessLoaderOptions: {
      additionalData: content => `${content}\n\n@import '${antdLessFile}';`
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });

      config.module.rules.push({
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader")
      });

      config.module.rules.push({
        test: /\.(mp3)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/sounds/",
            outputPath: "static/sounds/",
            name: "[name].[ext]",
            esModule: false
          }
        }
      });

      if (process.env.NODE_ENV === "production") {
        config.optimization.splitChunks.cacheGroups = {};
        config.optimization.minimize = true;
      }

      return config;
    }
  })
);
