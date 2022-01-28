SHELL = /bin/bash
PACKAGE = get_shopify_products

banner:
	@echo "Starting build for $(PACKAGE)"

clean-up-pycache:
	@echo "Cleaning up Python cache files"
	find ./ -type f -name '*.py[co]' -delete
	find ./ -type d -name '__pycache__' -delete

create-package:
	@echo "Creating lambda package $(PACKAGE)"
	mkdir -p ./lambda-dist/$(PACKAGE)
	cp *.py ./lambda-dist/$(PACKAGE)

install-req:
	@echo "Installing modules"
	pip install -r requirements.txt --no-deps -t ./lambda-dist/$(PACKAGE)/

compress-package:
	@echo "Compressing package $(PACKAGE)"
	cd lambda-dist/$(PACKAGE) && zip -q -r $(PACKAGE).zip *

# This needs to run last as to override any requirements from local reqs, utils, or data
install-psycopg2:
	@echo "Installing psycopg2"
	cd lambda-dist/$(PACKAGE) \
	    && git clone https://github.com/jkehler/awslambda-psycopg2.git .psycopg2 \
	    && cp -r .psycopg2/psycopg2-3.7/ psycopg2 \
	    && rm -rf .psycopg2

shopify-importer: banner clean-up-pycache create-package install-req install-psycopg2 compress-package

clean:
	rm -rf ./lambda-*/

.PHONY: lambda clean