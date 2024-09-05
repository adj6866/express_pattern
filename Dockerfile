###################
# BUILD
###################

FROM node:20-alpine AS build

WORKDIR /app
COPY . /app
RUN npm install && npm run build

###################
# DEPLOY
###################

FROM node:20-alpine AS deploy

ENV TZ=Asia/Jakarta

WORKDIR /app

EXPOSE 3000

EXPOSE 8080

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/tsconfig*.json ./
COPY --from=build /app/.env ./.env
CMD [ "node", "dist/app.js" ]