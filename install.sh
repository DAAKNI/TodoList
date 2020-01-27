echo "Running build for frontend"
(cd frontend && npm install && npm run build)
echo "Running build for docker compose"
docker-compose build
echo ''
echo 'run "docker-compose up" to start the project'