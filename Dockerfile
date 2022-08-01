FROM node:18
WORKDIR /app

ENV NODE_ENV production
ENV PORT 80

COPY server/     .

EXPOSE 80
CMD [ "yarn", "start" ]