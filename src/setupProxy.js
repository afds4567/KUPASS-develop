const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/randomuser", {
      target: "https://randomuser.me",
      changeOrigin: true,
      pathRewrite: {
        "^/randomuser": "",
      },
    })
  );
};
