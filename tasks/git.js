// Git functions
'use strict'
module.exports = function(gulp, config, plugins){


	gulp.task('gitinit', function(){
		return gulp.src('')
			.pipe(shell('git remote add origin ' + require('./package.json').repository.url, {
				verbose: true,
			}))
			.pipe(shell('git add -A', {
				verbose: true,
			}))
			.pipe(shell('git commit -m "Initial commit"', {
				verbose: true,
			}))
			.pipe(shell('git push -u origin master', {
				verbose: true,
			}))
	})



	gulp.task('commit', function(){
		let msg = process.argv[process.argv.length - 1]
		return gulp.src('')
			.pipe(shell('git add -A', {
				verbose: true,
			}))
			.pipe(shell('git commit -m "' + msg + '"', {
				verbose: true,
			}))
	})

	gulp.task('gitpush', function(){
		// Increment version and push
		return gulp.src('./package.json')
			.pipe(bump())
			.pipe(gulp.dest('./'))
			.pipe(shell('git add -A', {
				verbose: true,
			}))
			.pipe(shell('git commit -m "Version build/bump"', {
				verbose: true,
			}))
			.pipe(shell('git push -u origin master', {
				verbose: true,
			}))
	})
	gulp.task('push', function(cb){
		runSequence(
			'build',
			['gitpush'],
			cb
		)
	})

	gulp.task('gitrelease', function(){
		// Increment version and push
		return gulp.src('./package.json')
			.pipe(bump({type:'minor'}))
			.pipe(gulp.dest('./'))
			.pipe(shell('git add -A', {
				verbose: true,
			}))
			.pipe(shell('git commit -m "Version bump"', {
				verbose: true,
			}))
			.pipe(shell('git tag v' + require('./package.json').version, {
				verbose: true,
			}))
			.pipe(shell('git push -u origin master --tags', {
				verbose: true,
			}))

	})
	gulp.task('gitmajorrelease', function(){
		// Increment version and push
		return gulp.src('./package.json')
			.pipe(bump({type:'major'}))
			.pipe(gulp.dest('./'))
			.pipe(shell('git add -A', {
				verbose: true,
			}))
			.pipe(shell('git commit -m "Version bump"', {
				verbose: true,
			}))
			.pipe(shell('git tag v' + require('./package.json').version, {
				verbose: true,
			}))
			.pipe(shell('git push -u origin master --tags', {
				verbose: true,
			}))

	})




}