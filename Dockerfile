FROM node:lts

ENV NODE_ENV=production \
    PORT=19061

WORKDIR /service/roomBooking-backend

COPY ./dist /service/roomBooking-backend

RUN npm install yarn --registry https://registry.npm.taobao.org/; \
    yarn --registry https://registry.npm.taobao.org/

EXPOSE $PORT
CMD [ "node", "./bundle.js" ]