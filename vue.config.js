module.exports = {
  pages: {
    popup: {
      template: 'public/index.html',
      entry: './src/popup/main.js',
      title: 'Popup'
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry:  'src/background.js'
        },
        contentScripts: {
          entries: {
            script: 'src/content-scripts/script.js',
            blinkEffect: 'src/content-scripts/blinkEffect.js',
            CallDial: 'src/content-scripts/CallDial.js',
            changingSender: 'src/content-scripts/changingSender.js',
            gtm: 'src/content-scripts/gtm.js',
            tagManager: 'src/content-scripts/tagManager.js',
          }
        }
      }
    }
  }
}
