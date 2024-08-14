# Live Streaming

## Overview

Welcome to the **Live Streaming App**, a full-stack application built with React, Node.js, Express, and MongoDB. This application allows users to register, login, start live streams, and chat in real-time.


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker](#docker)


## Features

- User registration and authentication
- Start and stop live streams
- Real-time chat during live streams
- Responsive design
- Error handling and logging.

## Tech Stack

- **Frontend**: React, Axios, React Router, Tailwind CSS, Socket.IO, Emoji Picker
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB (using MongoDB Atlas)
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Management**: dotenv

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18.x or later)
- npm (v6.x or later) or yarn
- MongoDB Atlas account (for the database)

## Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/tarunbisht-24/live-streaming.git
    ```

2. **Backend Setup**

    Navigate to the backend directory and install dependencies:
    ```sh
    cd server
    npm install
    ```

    Create a `.env` file in the backend directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    JWT_SECRET=your-jwt-secret
    VITE_SERVER=http://localhost:5000
    ```

    Run the backend server:
    ```sh
    npm run start
    ```

3. **Frontend Setup**

    Navigate to the frontend directory and install dependencies:
    ```sh
    cd client
    npm install
    ```

  

    Run the frontend development server:
    ```sh
    npm run dev
    ```



## API Endpoints

- **User Authentication**
    - `POST /api/auth/register` - Register a new user
    - `POST /api/auth/login` - Login a user
    - `GET /api/profile/:userId` - Get user profile by ID

- **Streaming & Chat**
    - `POST / - Stream and chat handler(using socket.io)



## Docker

### Dockerfile for Backend
Create a Dockerfile in the backend directory:

```bash
FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```
### Docker Compose File
Create a docker-compose.yml in the root directory:
```bash
version: "3.9"
services:
  rtmp:
    build: ./rtmp
    ports:
      - "1935:1935"
      - "8080:8080"
    container_name: rtmp_server
    volumes:
      - ./data:/tmp/hls
  
  backend:
    build: ./backend
    container_name: backend_server
    environment:
      - PORT=5000
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
    ports:
      - "5000:5000"
    depends_on:
      - rtmp

  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
```
### Prometheus Configuration
Create a prometheus.yml file in the root directory:
```bash
global:
  scrape_interval: 5s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['backend_server:5000']
```
## Run the Application
1. Start all services using Docker Compose:
```bash 
docker-compose up --build
```

This will start the Docker containers for both the backend and frontend services.


By following the above steps, you should be able to set up, run, and manage your live streaming app with chat functionality using the Docker container.
