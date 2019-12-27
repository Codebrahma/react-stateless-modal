const { mergeWith } = require('lodash/fp')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Cb React Modal',
    description: 'A modal library that does not require state maintance',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        root: '/home/codebrahma/CB/cb-react-lib/.docz',
        base: '/',
        source: './',
        src: './',
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Cb React Modal',
        description: 'A modal library that does not require state maintance',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/home/codebrahma/CB/cb-react-lib',
          templates:
            '/home/codebrahma/CB/cb-react-lib/node_modules/docz-core/dist/templates',
          docz: '/home/codebrahma/CB/cb-react-lib/.docz',
          cache: '/home/codebrahma/CB/cb-react-lib/.docz/.cache',
          app: '/home/codebrahma/CB/cb-react-lib/.docz/app',
          appPackageJson: '/home/codebrahma/CB/cb-react-lib/package.json',
          gatsbyConfig: '/home/codebrahma/CB/cb-react-lib/gatsby-config.js',
          gatsbyBrowser: '/home/codebrahma/CB/cb-react-lib/gatsby-browser.js',
          gatsbyNode: '/home/codebrahma/CB/cb-react-lib/gatsby-node.js',
          gatsbySSR: '/home/codebrahma/CB/cb-react-lib/gatsby-ssr.js',
          importsJs: '/home/codebrahma/CB/cb-react-lib/.docz/app/imports.js',
          rootJs: '/home/codebrahma/CB/cb-react-lib/.docz/app/root.jsx',
          indexJs: '/home/codebrahma/CB/cb-react-lib/.docz/app/index.jsx',
          indexHtml: '/home/codebrahma/CB/cb-react-lib/.docz/app/index.html',
          db: '/home/codebrahma/CB/cb-react-lib/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
