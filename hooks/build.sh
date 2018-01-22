#!/bin/bash

# Executes at build-time at dockerhub, and is triggered when a 
# commit is pushed to github.

# Adds "dev" as build-arg for qed Dockerfile, but only if git branch is "dev":
# test "$1" = 'rpi' && (echo "hey")  # this conditional version worked!

# The below conditional works after adding spaces between [ and ]:
# if [ "$1" = 'rpi' ]; then
# 	echo "hey"
# fi

echo "Git branch = $SOURCE_BRANCH"
echo "Docker tag = $DOCKER_TAG"

if [ "$SOURCE_BRANCH" = 'rpi' ]; then
	echo "Using 'rpi' branch.."
	docker build -t popenc/projects:$SOURCE_BRANCH .
else
	docker build -t popenc/projects .
fi

#docker build --build-arg port=4001 -t popenc/projects:$SOURCE_BRANCH .