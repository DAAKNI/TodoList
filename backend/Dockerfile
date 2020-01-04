FROM python:3.8-alpine
MAINTAINER Modest Monkey

ENV PYTHONUNBUFFERED 1

# Copy python dependecies
COPY ./requirements.txt /requirements.txt

# Alpine can't pip install psycopg2 without some dependencies...
RUN apk add --update --no-cache postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev

# Install dependencies
RUN pip install -r /requirements.txt

# Remove build dependencies for psycopg2
RUN apk del .tmp-build-deps

RUN mkdir /app
WORKDIR /app
COPY ./app /app

RUN adduser -D user
USER user
