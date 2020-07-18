module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@controllers': './src/app/controllers',
          '@entities': './src/app/entities',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
  ignore: ['**/*.spec.ts'],
};
