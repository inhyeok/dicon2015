module.exports = (grunt) ->
  grunt.initConfig
    less:
      development:
        expand: true
        flatten: true
        cwd: 'static/style'
        src: ['*.less']
        dest: 'static/style/dist/'
        ext: '.css'
    coffee:
      development:
        expand: true
        flatten: true
        cwd: 'static/js'
        src: ['*.coffee']
        dest: 'static/js/dist/'
        ext: '.js'
    watch:
      files: ['static/style/*.less','static/js/*.coffee']
      tasks: ['less','coffee']

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-less'
  # grunt.loadNpmTasks 'grunt-contrib-uglify' #최적화
  # grunt.loadNpmTasks 'grunt-nodemon'
  # grunt.loadNpmTasks 'grunt-concurrent' #동시 빌드시간향상
  # grunt.loadNpmTasks 'grunt-env'
  # grunt.loadNpmTasks 'grunt-mocha-test'
  # grunt.loadNpmTasks 'grunt-shell'
  # grunt.loadNpmTasks 'grunt-newer'

  grunt.registerTask "default", ->
    console.log(3232)