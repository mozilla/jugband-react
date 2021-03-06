var webpack = require('webpack');

module.exports = function (grunt) {
  grunt.initConfig({
    clean: ['./build'],
    concurrent: {
      dev: ['nodemon:dev', 'webpack:dev'],
      options: {
        logConcurrentOutput: true
      }
    },
    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: 'assets',
          src: ['*.*'],
          dest: 'build/'
        }]
      }
    },
    nodemon: {
      dev: {
        script: './server.js',
        options: {
          ignore: ['build/**'],
          ext: 'js,jsx'
        }
      }
    },
    webpack: {
      dev: {
        resolve: {
          extensions: ['', '.js', '.jsx']
        },
        entry: './client.js',
        output: {
          path: './build/js',
          filename: 'client.js'
        },
        module: {
          loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: require.resolve('babel-loader') }
          ]
        },
        plugins: [
          new webpack.NormalModuleReplacementPlugin(/^react?$/, require.resolve('react')),
          new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons'))
        ],
        stats: {
          colors: true
        },
        devtool: 'source-map',
        watch: true,
        keepalive: true
      },
      prod: {
        resolve: {
          extensions: ['', '.js', '.jsx']
        },
        entry: './client.js',
        output: {
          path: './build/js',
          filename: 'client.js'
        },
        module: {
          loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: require.resolve('babel-loader') }
          ]
        },
        plugins: [
          new webpack.NormalModuleReplacementPlugin(/^react?$/, require.resolve('react')),
          new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons'))
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['clean', 'copy:assets', 'concurrent:dev']);
};
