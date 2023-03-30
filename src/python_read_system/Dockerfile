FROM python:3.8
LABEL AUTHOR="Lucas"
LABEL version="1.0"

ENV PYTHONUNBUFFEDRED 1

COPY ./config/newrelic_install.sh .
RUN bash && NEW_RELIC_API_KEY=NRAK-ZSZOSUHTW3S6ZWYQ9QKPND30D8N NEW_RELIC_ACCOUNT_ID=3582910 ./newrelic_install.sh -n logs-integration

RUN apt-get update && apt-get install -qq -y \
    bash git python3-dev curl gcc \
    postgresql-client gcc libc-dev libpq-dev python-dev libjpeg-dev zlib1g-dev

COPY python_read_system/requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r ./requirements.txt

COPY python_read_system/entrypoint.sh .
RUN chmod +x ./entrypoint.sh

WORKDIR /python_read_system
COPY python_read_system .

EXPOSE 8008
ENTRYPOINT ["./entrypoint.sh"]