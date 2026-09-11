FROM node:24-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY --chown=node:node server/ .

USER node
EXPOSE 8080

# PnP 런타임을 직접 물려 실행한다, 개발용 nodemon 은 프로덕션에 두지 않는다
CMD ["node", "--require", "./.pnp.cjs", "./bin/www.js"]
