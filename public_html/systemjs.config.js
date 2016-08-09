/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    '@angular/router':            'node_modules/@angular/router',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'symbol-observable':          'node_modules/symbol-observable',
    'rxjs':                       'node_modules/rxjs',
    'angular2-google-maps/core':  'node_modules/angular2-google-maps/core',
    'ng2-page-scroll':            'node_modules/ng2-page-scroll',
    'ng2-charts':                 'node_modules/ng2-charts/',
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    "ng2-charts":                 { main: "ng2-charts.js", defaultExtension: 'js'},
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'angular2-google-maps/core':  { main: 'index.js',  defaultExtension: 'js' },
    'ng2-page-scroll':            { main: 'ng2-page-scroll.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'symbol-observable':          { main: 'index.js', defaultExtension: 'js' }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
