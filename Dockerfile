FROM node:12.19.0-alpine3.9
RUN mkdir -p /code
WORKDIR /code
ADD . /code
#RUN npm install yarm --save 
# npm install -g -s --no-progress yarn && \
#    yarn && \ 
#RUN  yarn run build
#RUN  yarn run prune 
#RUN  yarn cache clean
#CMD [ "yarn", "start" ]
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 3000