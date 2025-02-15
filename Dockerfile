FROM node:latest

ARG projectFolder=/home/node
WORKDIR $projectFolder
COPY ./ ./
RUN npm install

