var webpack = require('webpack');
var rs = __dirname + '/docs'
var js = rs+'/script'
var debug = process.env.NODE_ENV!='production'

var entry = {
    "seed" : "seed.js",
    "index" : "index.js",
    "control" : "control.js",
    "examples/index" : "examples/index.js"  
}
for( var i in entry ){
  var e = entry[i] = [js+'/'+entry[i]]  
  debug && e.unshift('webpack-dev-server/client?http://127.0.0.1:4000', 'webpack/hot/only-dev-server')
}
var output = {
  path: rs+'/dist/',
  publicPath: 'dist/',  
  filename: '[name].bundle.js',
  chunkFilename: "c/[name].bundle.js?t=[chunkhash]"
}
var resolve = {
    "alias": {
      js,
      nj  : __dirname+'/src/lib',
      css : rs+'/css'
    }
}

var plugins = [
  new webpack.optimize.CommonsChunkPlugin({
      name: 'seed',
      filename : 'seed.js'
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': debug ? '"development"' : '"production"'
  })  
];
debug && plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = {
  entry,
  output,
  resolve,
  plugins,    
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-1'
    }, {
      test: /\.less$/,   
      loader : 'style-loader?insertAt=top!css-loader!less-loader'   
    }, {
      test: /\.css$/,   
      loader : 'style-loader?insertAt=top!css-loader'   
    }, {
      test: /\.(png|jpg)$/,
      use: 'file-loader?name=img/lib/[hash:8].[name].[ext]'
    }]
  }
};