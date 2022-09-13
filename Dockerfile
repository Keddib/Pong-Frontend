FROM node:16-alpine

# set working directory
WORKDIR /usr/src/app
RUN npm install -g npm@8.17.0

COPY package-lock.json /usr/src/app/
COPY package.json /usr/src/app/

RUN npm install

# start app
CMD ["/bin/sh", "run.sh"]
