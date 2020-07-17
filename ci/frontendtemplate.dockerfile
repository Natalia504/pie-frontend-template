ARG REPO=nginx
ARG TAG=1.17.6-alpine
ARG VERSION
ARG MAINTAINER=kyle.davison@pieinsurance.com

FROM ${REPO}:${TAG}

ARG VERSION
ARG MAINTAINER

LABEL version=${VERSION}
LABEL maintanier=${MAINTAINER}

COPY ./ci/frontend-template.nginx.conf /etc/nginx/conf.d/frontend-template.nginx.conf
COPY build /srv
COPY storybook-static /srv/storybook

EXPOSE 8080
