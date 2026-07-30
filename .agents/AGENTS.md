# Real Time Chat - Agent Rules and Context

## Project Context
This is a portfolio project demonstrating the implementation of a real-time chat application. It is uniquely structured with a single backend and **two separate frontends** (Vue and React). Both frontends have exactly the same functionality and design. The purpose of this dual-frontend approach is to showcase proficiency in building identical features using different modern frameworks.

## Architecture & Tech Stack
- **Backend (`/server`)**: Node.js, Express, Socket.io
- **Vue Frontend (`/vue-chat`)**: Vue.js, Pinia (State Management), Socket.io-client
- **React Frontend (`/react-chat`)**: React, Zustand (State Management), Socket.io-client

## Core Features
- **Authentication**: Simple entry. The user chooses a display name to enter the chat.
- **Avatars**: Automatically generated based on the user's initials.
- **Real-Time Status**: Visual indicators showing user connection status.
- **Messages**: Includes timestamps for every sent message.
- **Persistence**: Sessions and chat history are preserved across browser refreshes and closed tabs.
- **Logout ("Salir")**: Clicking the "Salir" (Logout) button clears the session and deletes the user's chat history.

## Strict Rules for Agents
1. **Frontend Parity**: Because the two frontends must do exactly the same thing, **any new feature, bug fix, or UI change requested for the frontend MUST be implemented in BOTH the Vue (`/vue-chat`) and React (`/react-chat`) directories** unless the user explicitly specifies otherwise.
2. **State Management**:
   - Use **Pinia** when working inside `/vue-chat`.
   - Use **Zustand** when working inside `/react-chat`.
3. **Real-time Communication**: Use **Socket.io** events for all real-time data sync between the client and server. Do not introduce alternative polling or websocket libraries.
4. **Consistency**: Maintain identical CSS styling and class names across both frontends where possible to ensure they look identical.
