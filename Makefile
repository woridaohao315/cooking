bootstrap:
	./node_modules/.bin/lerna bootstrap
	cd packages/cooking-cli; \
	npm i; \
	sh scripts/bootstrap.sh
