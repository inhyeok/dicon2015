module.exports = (grunt) ->
  grunt.initConfig
    less:
      development:
        expand: true
        flatten: true
        cwd: 'public/style'
        src: ['*.less']
        dest: 'public/style/dist/'
        ext: '.css'
    coffee:
      development:
        expand: true
        flatten: true
        cwd: 'public/js'
        src: ['*.coffee']
        dest: 'public/js/dist/'
        ext: '.js'
    watch:
      files: ['public/style/*.less','public/js/*.coffee']
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