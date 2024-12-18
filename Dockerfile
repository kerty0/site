FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm clean-install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]