FROM node:18.1.0-alpine3.15
WORKDIR /app
COPY app/package.json package.json
COPY app/package-lock.json package-lock.json
RUN npm ci
CMD ["npm", "start"]
EXPOSE 3000
