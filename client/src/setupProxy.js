if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createProxyMiddleware } = require("http-proxy-middleware");
  module.exports = function(app) {
    app.use(
      "/api",
      createProxyMiddleware({
        target: "http://localhost:3000",
        changeOrigin: true,
      }),
    );
    app.use(
      "/user.json",
      createProxyMiddleware({
        target: "http://localhost:3000",
        changeOrigin: true,
      }),
    );
  };
}
