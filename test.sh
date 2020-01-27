#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments provided, Testing all components"
    echo ""
    echo "Testing backend.."
    docker-compose run backend sh -c "python manage.py test -v 2"
    echo ""
    echo "######################################################################"
    echo ""
    echo "Testing frontend... "
    ( cd frontend && npm run test )
    exit 1
fi


for arg in "$@"
do
    if [ "$arg" == "frontend" ]
    then
        ( cd frontend && npm run test )
    fi
    if [ "$arg" == "backend" ]
    then
        docker-compose run backend sh -c "python manage.py test -v 2"
    fi
done