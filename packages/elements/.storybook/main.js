module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  features: {
    // fix to enable mui theme
    emotionAlias: false,
  },
  docs: {
    autodocs: true,
  },
};
