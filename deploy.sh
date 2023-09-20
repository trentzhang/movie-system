#!/bin/bash

cd /root/Github/movie-system
git pull

# Kill the process using port 3000,3001
lsof -i :3000,3001 | grep LISTEN | awk '{print $2}'|xargs  -n 1 kill


# Change to the backend directory and start the server in a detached tmux session
# note: backend running default on port 3000
cd /root/Github/movie-system/backend
tmux kill-session -t backend-session
tmux new-session -d -s backend-session 'yarn install && yarn start'

# Change to the frontend directory and build the project
cd /root/Github/movie-system/frontend
yarn install
yarn build
# Serve the frontend build in the background
nohup serve -s build -p 3001 > output.log 2>&1 &







