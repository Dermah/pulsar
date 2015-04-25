'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'dist/pulsar.js': ['pulsar.js']
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-browserify');

  // Lint all files
  grunt.registerTask('build', [
    'browserify',
  ]);
};
