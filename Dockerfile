FROM node:16

# set working directory
WORKDIR /usr/src/app

# start app
CMD ["bash", "run.sh"]
