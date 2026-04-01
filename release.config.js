export default {
  branches: ['master'],
  tagFormat: 'v${version}',
  plugins: [
    ['@semantic-release/commit-analyzer', {
      releaseRules: [
        { type: 'feat', release: 'minor' },
        { type: 'fix', release: 'patch' },
        { type: 'perf', release: 'patch' },
        { type: 'chore', release: 'patch' }
      ],
    }],
    '@semantic-release/release-notes-generator',
    ['@semantic-release/npm', {
      npmPublish: true,
      pkgRoot: '.',
    }],
    '@semantic-release/git'
  ],
};