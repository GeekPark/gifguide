module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9000, //run on port 9000
          open: true //open browser
        }
      }
    },
    autoprefixer: {
      options: {
        cascade: true
      },
      single_file: {
        src: 'assets/css/gifguide.css'
      }
    },
    uglify: {
      options: {},
      dist: {
        files: {
          'assets/javascript/gifguide.min.js': 'src/gifguide.js'
        }
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'assets/css/gifguide.css': 'src/gifguide.scss'
        }
      }
    },
    watch:{
      sass:{
        files: 'src/gifguide.scss',
        tasks:['sass','cssmin']
      },
      js:{
        files: 'src/gifguide.js',
        tasks:['uglify']
      },
      all: {
        files: ['src/*.*','*.html'],
        options: {
          livereload: true,
          interval: 1500
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['uglify', 'sass', 'autoprefixer', 'connect', 'watch']);
}
