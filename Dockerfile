FROM node:dubnium-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY . .

RUN npm run build

FROM node:dubnium-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY --from=builder /usr/src/app/etc ./../etc/
COPY --from=builder /usr/src/app/dist ./
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000
CMD [ "npm", "start" ]
