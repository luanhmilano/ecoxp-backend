---
applyTo: '**'
---

Todas as respostas do GitHub Copilot devem ser fornecidas em **português (PT-BR)** e sem uso de emojis.

# Copilot Instructions for ecoxp-backend

## Overview
This project is a NestJS backend for EcoXP, using PostgreSQL (with PostGIS) and TypeORM. It manages users, collection points, and user checkpoints, and provides an admin panel for CRUD operations on collection points.

## Architecture & Structure
- **src/entities/**: TypeORM entities for `User`, `CollectionPoint`, and `UserCheckpoint`. Each entity maps directly to a database table and uses decorators for schema definition.
- **src/adm-panel/**: Contains the admin panel module, controller, service, and DTOs. All admin-related endpoints and logic are here.
- **src/config/ormconfig.ts**: Central TypeORM configuration. Database connection settings are loaded from environment variables.
- **src/app.module.ts**: Main NestJS module, imports all feature modules.
- **src/main.ts**: Application entry point.

## Key Patterns & Conventions
- **DTOs**: All request/response validation and typing is handled via DTOs in `src/adm-panel/dto/`.
- **Service Layer**: Business logic is in services (e.g., `adm-panel.service.ts`). Controllers are thin and delegate to services.
- **Entity Relationships**: User has optional guardian (self-referencing), UserCheckpoint links users to collection points.
- **Geospatial Data**: Collection points use PostGIS geography type for location.
- **Environment Variables**: Use `.env` for secrets and DB config. Copy from `.env.example` if needed.

## Developer Workflows
- **Install dependencies**: `npm install`
- **Run in dev mode**: `npm run start:dev`
- **Build**: `npm run build`
- **Run tests**: (If tests exist) `npm test`
- **Database setup**: Ensure PostgreSQL with PostGIS, create `ecoxp` DB, configure `.env`.

## API & Endpoints
- All admin endpoints are under `/adm-panel/collection-points` (CRUD for collection points).
- See `README.md` for full endpoint list and entity schemas.

## Integration Points
- **Database**: PostgreSQL with PostGIS, configured via TypeORM.
- **Environment**: All sensitive/config values via `.env`.

## Examples
- To add a new entity, create a file in `src/entities/`, decorate with TypeORM decorators, and import in `app.module.ts`.
- To add a new admin endpoint, add to `adm-panel.controller.ts` and implement logic in `adm-panel.service.ts`.

## References
- See `README.md` for setup, entity, and endpoint details.
- See `src/adm-panel/dto/` for DTO patterns.
- See `src/entities/` for entity conventions.

---
If unsure about a pattern or workflow, prefer following the structure and conventions in the files above. When in doubt, ask for clarification or check the README for more details.
