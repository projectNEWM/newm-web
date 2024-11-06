sentry-sourcemaps:
	sentry-cli sourcemaps inject --org project-newm --project javascript-react ./dist/apps/studio/ && sentry-cli sourcemaps upload --org project-newm --project javascript-react ./dist/apps/studio/

build-studio:
	nx build studio --no-cloud

build-studio-with-sentry: build-studio sentry-sourcemaps