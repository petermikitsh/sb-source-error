module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
  ],
  webpackFinal: async (config) => {
    // remove existing source-loader in place
    config.module.rules.splice(6, 1);
    console.log(config.module.rules);
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.stories\.[jt]sx?$/,
        loaders: [
          {
            loader: require.resolve("@storybook/source-loader"),
            options: { parser: "typescript", injectStoryParameters: false },
          },
        ],
        enforce: "pre",
      },
    ];
    return config;
  },
};
