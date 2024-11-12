FROM ruby:3.2.2-slim-bullseye

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Configure apt and install packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends git g++ vim make\
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*
# Install pages requirements
RUN gem install bundler
RUN echo "bundle install && bundle exec jekyll serve" > ~/.bashrc
