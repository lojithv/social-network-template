REPORTER = list
MOCHA_OPTS = --ui bdd -c


db:
	echo Seeding blog *****************************************************
	./db/seed.sh
test:
	clear
	./db/seed.sh
	echo Starting test *********************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	test/*.js
	echo Ending test
start:
	node app

.PHONY: test db start