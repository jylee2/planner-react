MAKEFILE := $(abspath $(lastword $(MAKEFILE_LIST)))
ROOT_PATH := $(shell pwd)

RED=`tput setaf 1`
GREEN=`tput setaf 2`
YELLOW=`tput setaf 3`
CYAN=`tput setaf 6`
NC=`tput sgr0`

.PHONY:
all: version

version:
	@echo $(shell node -p "require('$(ROOT_PATH)/package.json').version")

name:
	@echo $(shell node -p "require('$(ROOT_PATH)/package.json').name")

production:
	@echo "${YELLOW}-------- CREATING PRODUCTION BUILD --------${NC}"
	@rm -rf ./node_modules && npm i && echo "STEP 1: NPM INSTALL - ${GREEN}Done${NC}"
	@rm -rf ./build/* && echo "STEP 2: CLEANING BUILD DIR - ${GREEN}Done${NC}"
	@npm run deploy && echo "STEP 3: PRODUCTION BUILD - ${GREEN}Done${NC}"
	@echo ${GREEN}-------- PRODUCTION BUILD SUCCESS --------${NC}

test:
	@echo "${CYAN}-------- CREATING TEST BUILD --------${NC}"
	@rm -rf ./node_modules && npm i && echo "STEP 1: NPM INSTALL - ${GREEN}Done${NC}"
	@rm -rf ./build/* && echo "STEP 2: CLEANING BUILD DIR - ${GREEN}Done${NC}"
	@npm run predeploy && echo "STEP 3: BUILD - ${GREEN}Done${NC}"
	@echo ${GREEN}-------- TEST COMPLETED--------${NC}