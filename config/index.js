const path = require('path')

// sass
const sassImporter = function (url) {
  if (url[0] === "~" && url[1] !== "/") {
    return {
      file: path.resolve(__dirname, "..", "node_modules", url.substr(1))
    }
  }

  const reg = /^@styles\/(.*)/

  return {
    file: reg.test(url)
      ? path.resolve(__dirname, "..", "src/styles", url.match(reg)[1])
      : url
  }
}

const config = {
  projectName: 'taro-test',
  date: '2020-3-12',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  // babel: {
  //   sourceMap: true,
  //   presets: [
  //     ['env', {
  //       modules: false
  //     }]
  //   ],
  //   plugins: [
  //     'transform-decorators-legacy',
  //     'transform-class-properties',
  //     'transform-object-rest-spread'
  //   ]
  // },
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        [
          "env",
          {
            modules: false
          }
        ]
      ],
      plugins: [
        "transform-decorators-legacy",
        "transform-class-properties",
        "transform-object-rest-spread"
      ]
    },
    sass: {
      importer: sassImporter
    }
  },
  defineConstants: {
  },
  alias: {
    "@actions": path.resolve(__dirname, "..", "src/actions"),
    "@assets": path.resolve(__dirname, "..", "src/assets"),
    "@components": path.resolve(__dirname, "..", "src/components"),
    "@constants": path.resolve(__dirname, "..", "src/constants"),
    "@reducers": path.resolve(__dirname, "..", "src/reducers"),
    "@styles": path.resolve(__dirname, "..", "src/styles"),
    "@store": path.resolve(__dirname, "..", "src/store"),
    "@utils": path.resolve(__dirname, "..", "src/utils")
  },
  copy: {
    patterns: [],
    options: {}
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"]
          }
        },
        pxtransform: {
          enable: true,
          config: {}
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]"
          }
        }
      }
    }
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    esnextModules: ["taro-ui"],
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"]
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]"
          }
        }
      }
    },
    sassLoaderOption: {
      importer: sassImporter
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
