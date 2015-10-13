REPORTER = list
MOCHA_OPTS = --ui bdd -c


db:
	echo Seeding blog *****************************************************
	./db/seed.sh
test:
	clear

	echo Starting test *********************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	test/*.js
	echo Ending test
start:
	TWITTER_CONSUMER_KEY=ljloHE8WRQgLLRR2gF8Bn6soD \
	TWITTER_CONSUMER_SECRET=Hx1pVinvB5haZWgMxrD9Vi55Bf8aubSB4CxFoeuqChASUPujdf \
	node app

.PHONY: test db start