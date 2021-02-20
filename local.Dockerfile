FROM node:12.13-alpine As development
ENV HOME=/usr/src/app
# Copy the package files
COPY package.json ${WORKDIR}/
COPY package-lock.json ${WORKDIR}/
# Install all dependencies
RUN npm install --production=false
# Finally copy the current sources and build the bundle
COPY . .
# EXPOSE TARGET PORT
EXPOSE 8877
# Setup entry point
COPY dev.Dockerfile.entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
