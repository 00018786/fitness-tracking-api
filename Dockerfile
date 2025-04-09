FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

# Install all dependencies (including dev dependencies for json-server)
RUN npm install

COPY . .

RUN npm run build

# Create a script to run both servers
RUN echo '#!/bin/sh\n\
npm start & \n\
json-server --watch db.json --port $PORT --host 0.0.0.0 \n\
wait' > /usr/src/app/start.sh && chmod +x /usr/src/app/start.sh

# Render requires the PORT environment variable
ENV PORT=3000

EXPOSE $PORT

CMD ["/usr/src/app/start.sh"]