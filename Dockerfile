FROM node:slim AS app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Set the working directory inside the container
WORKDIR /usr/src/app

RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

COPY .env .env

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3005
EXPOSE 3005

# Command to run the application
CMD ["npm", "start"]
