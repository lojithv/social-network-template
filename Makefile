REPORTER = list
MOCHA_OPTS = --ui bdd -c


db:
	echo Seeding blog *****************************************************
	./db/seed.sh
test:
	clear
	./db/seed.sh
	echo Starting test ******************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	test/*.js
	echo Ending test
user:
	clear
	echo Testing post *******************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	test/user.js
	echo Ending test
post: 
	clear
	echo Testing post *******************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	test/post.js
	echo Ending test
start:
	node app

.PHONY: test db start