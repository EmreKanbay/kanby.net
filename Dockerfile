# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.

ENV PG_PORT ""
ENV PG_USER ""	
ENV PG_PASSWORD ""	
ENV PG_DATABASE ""
ENV PG_HOST ""
ENV CDN_DOMAIN ""
ENV REDIS_HOST ""
ENV REDIS_PORT ""

 
# there is no trailing slash on CDN domain. do NOT do that -> http://abc.com/
# Instead do that -> http://abc.com
# All required files must be exist in cdn  
ENV CDN_DOMAIN "" 


WORKDIR /usr/src/app

COPY . .

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN npm i

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.


# Expose the port that the application listens on.
EXPOSE 3000
 
# Run the application.
CMD ["node", "./src"]