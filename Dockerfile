# backend/Dockerfile
FROM node:18

WORKDIR /app

RUN npm install -g json-server

COPY db.json .

EXPOSE 3001

CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "3000"]