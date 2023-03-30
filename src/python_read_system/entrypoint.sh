#!/usr/bin/env bash

set -ef

cli_help() {
  cli_name=${0##*/}
  echo "
$cli_name
CQRS Events entrypoint cli
Usage: $cli_name [command]
Commands:
  listen_events deploy events listeners
  runserver     deploy runserver
  *             Help
"
  exit 1
}

case "$1" in
  migrate)
    python manage.py migrate
    ;;
  listen_events)
    python manage.py listen_events
    ;;
  runserver)
    python manage.py runserver 0.0.0.0:8008
    ;;
  *)
    cli_help
    ;;
esac
