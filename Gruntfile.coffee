module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # meta options
    meta:
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n ' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n *\\n " : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.email %>>;\n' +
      ' * Licensed under the <%= _.pluck(pkg.licenses, "type").join(", ") %> license */\n\n'

    # concat src files
    concat:
      options:
        separator: '\n\n'

    # watch for changes
    watch:
      scripts:
        files: ['src/*.js']
        tasks: ['concat']
        options:
          interrupt: true

    # simple node server
    connect:
      server:
        options:
          hostname: "0.0.0.0"

  # Load tasks
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'


  # Default task(s).
  grunt.registerTask 'default', ['connect','socket','watch']


  grunt.registerTask 'socket', 'start binaryjs server', ()->
    @async()

    options = {
      cmd: 'supervisor'
      args: ['-w','src', 'src/socket.js']
    }

    ps = grunt.util.spawn options, (data)->
      grunt.log.writeln(data)

    ps.stdout.on 'data', (data)->
      grunt.log.writeln(data)



