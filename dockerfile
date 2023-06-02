FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
COPY .env /app/.env
ENV PATH_TO_ENV=/app/.env
EXPOSE 5000
CMD ["npm", "start"]