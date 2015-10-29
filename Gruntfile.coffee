module.exports = (grunt) ->
  grunt.initConfig
    env:
      dev:
        NODE_ENV: 'developemnt'
      prod:
        NODE_ENV: 'production'
    concurrent:
      debug:
        tasks: ['watch']
        options:
          logConcurrentOutput: true
    less:
      dev:
        expand: true
        flatten: true
        cwd: 'public/style'
        src: ['*.less']
        dest: 'public/style/dist/'
        ext: '.css'
    coffee:
      dev:
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
  grunt.loadNpmTasks 'grunt-concurrent' #동시 빌드시간향상
  # grunt.loadNpmTasks 'grunt-contrib-uglify' #최적화
  # grunt.loadNpmTasks 'grunt-nodemon'
  grunt.loadNpmTasks 'grunt-env'
  # grunt.loadNpmTasks 'grunt-mocha-test'
  # grunt.loadNpmTasks 'grunt-shell'
  # grunt.loadNpmTasks 'grunt-newer'

  grunt.registerTask "serve", [
    'env:dev'
    'concurrent:debug'
  ]

  grunt.registerTask "default", ->
    console.log(3232)