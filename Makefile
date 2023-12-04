sentry-sourcemaps:
	sentry-cli sourcemaps inject --org project-newm --project javascript-react ./build/ && sentry-cli sourcemaps upload --org project-newm --project javascript-react ./build/

build-studio:
	nx build studio

build-studio-with-sentry: build-studio sentry-sourcemaps