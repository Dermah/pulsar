'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'dist/pulsar.js': ['src/pulsar.js']
        }
      }
    },

    watch: {
      files: ['**/*.js', '!dist/**/*.js'],
      tasks: ['build'],
    },


  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Lint all files
  grunt.registerTask('build', [
    'browserify',
  ]);
};
