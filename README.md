# Emergency Priority Chat Application

This Emergency Priority Chat Application enables real-time communication with priority-based messaging, making it ideal for disaster response and urgent communication scenarios. Messages marked as "urgent" or "high" priority are highlighted, ensuring critical information is quickly noticed and addressed.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Setup](#setup)
- [Usage](#usage)

## Features

- **Real-Time Chat**: Communicate in real-time with other users in a shared room.
- **Priority Messages**: Send messages with `normal`, `high`, or `urgent` priority levels. Messages are color-coded based on priority to quickly distinguish their importance.
- **Room-Based Communication**: Join specific chat rooms to organize conversations by team, region, or any other group identifier.
- **Socket-Based Messaging**: Uses WebSockets for low-latency message delivery, enabling quick and reliable communication.
- **Emergency Notifications**: Messages marked as `urgent` or `high` are highlighted with custom styles for visibility in emergency scenarios.

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Node.js, Express, Socket.io
- **Deployment**: Configurable for local or cloud hosting

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- **Node.js** and **npm** installed on your machine.

### Setup

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/SSanjay0614/Emergency-Chat-Application-with-Priority.git
cd Priority-Chat
```

#### Backend Setup

Navigate to the backend folder, install dependencies, and start the server:

```bash
cd backend
npm install
node server.js
```
#### Frontend Setup

Open a new terminal, navigate to the frontend folder, install dependencies, and start the React app:

```bash
cd frontend
npm install
npm start
```

The backend will run on http://localhost:5000 and the frontend on http://localhost:3000.

### Usage

Join a Room: Enter your name and room to join.

Send Priority Messages: Choose the priority level for your message from the dropdown menu (Normal, High, Urgent) and send it.

View Prioritized Messages: Messages will appear color-coded based on priority to highlight their importance.

#### Priority levels and their visual indicators:

Urgent: Red background, bold text

High: Orange background, bold text

Normal: Default color

