module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9000, //run on port 9000
          open: false //open browser
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
          'assets/javascript/gifguide.min.js': ['src/jquery.min.js','src/idangerous.swiper.min.js','src/gifguide.js']
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
    cssmin: {
      target: {
        files: {
          'assets/css/gifguide.min.css': ['assets/css/normalize.css', 'assets/css/gifguide.css']
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
        },
        files: [{
        expand: true,
          cwd: 'src/images/',
          src: ['**/*.{png,jpg,jpeg}'],
          dest: 'assets/images/'
        }]
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
      images: {
        files: ['src/images/*.*'],
        tasks:['imagemin']
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['uglify', 'sass', 'cssmin', 'autoprefixer', 'connect', 'watch']);
}
