@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe" "%~dp0\node_modules\gulp\bin\gulp.js" %*
) ELSE (
  node "%~dp0\node_modules\gulp\bin\gulp.js" %*
)