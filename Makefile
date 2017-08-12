REPORTER = list
MOCHA_OPTS = --ui bdd -c


db:
	echo Seeding blog *****************************************************
	./src/db/seed.sh
test:
	clear
	./src/db/seed.sh
	echo Starting test ******************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	src/user/user.spec.js
	src/post/post.spec.js
	echo Ending test
user:
	clear
	echo Testing post *******************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	src/user/user.spec.js
	echo Ending test
post: 
	clear
	echo Testing post *******************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	src/post/post.spec.js
	echo Ending test
start:
	node app

.PHONY: test db start