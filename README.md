# ecoxp-backend
Backend do EcoXP

## Description

This is a NestJS backend application for EcoXP, featuring PostgreSQL database integration with TypeORM.

## Features

- **User Management**: Users with roles and guardian relationships
- **Collection Points**: Geographic points for collection activities
- **User Checkpoints**: Track user visits to collection points
- **Admin Panel**: CRUD operations for managing collection points

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher with PostGIS extension for geography support)
- npm or yarn

## Installation

```bash
npm install
```

## Database Setup

1. Install PostgreSQL with PostGIS extension
2. Create a database named `ecoxp`
3. Copy `.env.example` to `.env` and update with your database credentials:

```bash
cp .env.example .env
```

## Running the Application

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Build

```bash
npm run build
```

## Database Entities

### Users
- id (uuid)
- name (varchar)
- email (varchar, unique)
- password_hash (varchar)
- role (varchar)
- guardian_id (uuid, nullable)

### Collection Points
- id (uuid)
- name (varchar)
- type (varchar)
- location (geography point)

### User Checkpoints
- id (uuid)
- user_id (uuid)
- point_id (uuid)
- completed_at (timestamp)

## API Endpoints

### Admin Panel - Collection Points

- `POST /adm-panel/collection-points` - Create a new collection point
- `GET /adm-panel/collection-points` - List all collection points
- `GET /adm-panel/collection-points/:id` - Get a specific collection point
- `PUT /adm-panel/collection-points/:id` - Update a collection point
- `DELETE /adm-panel/collection-points/:id` - Delete a collection point

## Project Structure

```
src/
├── entities/              # TypeORM entities
│   ├── user.entity.ts
│   ├── collection-point.entity.ts
│   └── user-checkpoint.entity.ts
├── adm-panel/            # Admin panel module
│   ├── dto/              # Data Transfer Objects
│   ├── adm-panel.controller.ts
│   ├── adm-panel.service.ts
│   └── adm-panel.module.ts
├── app.module.ts         # Main application module
├── main.ts              # Application entry point
└── ormconfig.ts         # TypeORM configuration
```
