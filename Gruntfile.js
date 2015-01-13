module.exports = function(grunt) {

	// Load ALL NPM Tasks
	require('jit-grunt')(grunt);

	// Display the elapsed execution time of tasks
	require('time-grunt')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		project: {
			devDir: 'src',
			buildDir: 'dist',
			development: '<%= project.devDir %>',
			production: '<%= project.buildDir %>'
		},

		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>' + ' <%= pkg.homepage %> ' +
			'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
			' Licensed <%= pkg.licenses %> */\n'
		},

		// Update NPM Packages
		devUpdate: {
			main: {
				options: {
					reportUpdated: false, // Report updated dependencies? 'false' | 'true'
					updateType   : "force" // 'force'|'report'|'prompt'
				}
			}
		},

		// List watch tasks: 'grunt -v'
		watch: {
			html: {
				files: [
					'**/*.html',
					'**/*.php',
					'img/**/*.{png,jpg,jpeg,gif,webp,svg}'
				]
			},

			css: {
				files: ['css/**/*.css']
			},

			js: {
				files: ['js/**/*.js']
			},

			livereload: {
				files: [
					'**/*.html',
					'**/*.php',
					'css/**/*.css',
					'js/**/*.js',
					'img/**/*.{png,jpg,jpeg,gif,webp,svg}'
				],

				options: { livereload: true }
			}
		},

		concurrent: {
			target: {
				tasks: ['watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		connect: {
			server: {
				options: {
					port: 9001,
					protocol: 'http',
					hostname: 'localhost',
					base: '.',  // '.' operates from the root of your Gruntfile, otherwise -> 'Users/user-name/www-directory/website-directory'
					keepalive: false, // set to false to work side by side w/watch task.
					livereload: true,
					open: true
				}
			}
		},

		qunit: {
			all: ['**/*.html', '**/*.php']
		},

		jshint: {
			files: ['js/**/*.js'],

			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			},

			uses_defaults: ['js/**/*.js']
		},

		clean: ['dist'],

		copy: {
			html: {
				files: [
					{
						// Destiniation 'string' : Source [array]
						'<%= project.buildDir %>/index.html': ['index.html']
					}
				]
			}
		}
	});


	// Development
	grunt.registerTask('default', ['connect', 'concurrent:target', 'newer:watch']);
	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('test', ['qunit']);

	// Maintenance
	grunt.registerTask('update', ['devUpdate']);
};
