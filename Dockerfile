FROM node:16

# set working directory
WORKDIR /usr/src/app
RUN npm install -g npm@8.17.0

# start app
CMD ["/bin/sh", "run.sh"]
