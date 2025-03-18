import { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
const config: StorybookConfig = {
  core: {
    builder: '@storybook/builder-vite',
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: true,
      },
    },
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
  ],
  viteFinal: async (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }

    config.resolve.alias['@'] = path.resolve(__dirname, '../src');

    return config;
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: './tsconfig.app.json', // 👈 This solves your problem.
    },
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
export default config;
