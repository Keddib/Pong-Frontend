FROM node:16-alpine

# set working directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

# start app
CMD ["/bin/sh", "run.sh"]
