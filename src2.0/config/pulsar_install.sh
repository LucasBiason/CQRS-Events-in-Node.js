#!/bin/bash

RUN apt-get update && apt-get install -qq -y g++ make \
  cmake libssl-dev libcurl4-openssl-dev liblog4cxx-dev \
  libprotobuf-dev protobuf-compiler libboost-all-dev google-mock libgtest-dev libjsoncpp-dev

WGET1='wget https://archive.apache.org/dist/pulsar/pulsar-2.9.1/DEB/apache-pulsar-client.deb'
WGET2='wget https://archive.apache.org/dist/pulsar/pulsar-2.9.1/DEB/apache-pulsar-client-dev.deb'
`$WGET1`
`$WGET2`
apt-get update &&  apt install ./apache-pulsar-client*.deb