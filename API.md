# API Documentation

## Base URL
```
http://localhost:3000
```

## Admin Panel Endpoints

### Collection Points Management

#### 1. Create Collection Point
**POST** `/adm-panel/collection-points`

**Request Body:**
```json
{
  "name": "Central Park Recycling Station",
  "type": "recycling",
  "location": "POINT(-46.6333 -23.5505)"
}
```

**Response:** (201 Created)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Central Park Recycling Station",
  "type": "recycling",
  "location": "POINT(-46.6333 -23.5505)"
}
```

---

#### 2. Get All Collection Points
**GET** `/adm-panel/collection-points`

**Response:** (200 OK)
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Central Park Recycling Station",
    "type": "recycling",
    "location": "POINT(-46.6333 -23.5505)"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Downtown Donation Center",
    "type": "donation",
    "location": "POINT(-46.6344 -23.5515)"
  }
]
```

---

#### 3. Get Collection Point by ID
**GET** `/adm-panel/collection-points/:id`

**Response:** (200 OK)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Central Park Recycling Station",
  "type": "recycling",
  "location": "POINT(-46.6333 -23.5505)"
}
```

**Error Response:** (404 Not Found)
```json
{
  "statusCode": 404,
  "message": "Collection point with ID 550e8400-e29b-41d4-a716-446655440000 not found"
}
```

---

#### 4. Update Collection Point
**PUT** `/adm-panel/collection-points/:id`

**Request Body:**
```json
{
  "name": "Central Park Eco Station",
  "type": "eco-station"
}
```

**Response:** (200 OK)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Central Park Eco Station",
  "type": "eco-station",
  "location": "POINT(-46.6333 -23.5505)"
}
```

---

#### 5. Delete Collection Point
**DELETE** `/adm-panel/collection-points/:id`

**Response:** (204 No Content)

---

## Database Schema

### Tables

#### users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    guardian_id UUID REFERENCES users(id)
);
```

#### collection_points
```sql
CREATE TABLE collection_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    location GEOGRAPHY(Point, 4326)
);
```

#### user_checkpoints
```sql
CREATE TABLE user_checkpoints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    point_id UUID NOT NULL REFERENCES collection_points(id),
    completed_at TIMESTAMP NOT NULL
);
```

## Geographic Location Format

The `location` field uses PostGIS geography type with SRID 4326 (WGS 84).

**Format:** `POINT(longitude latitude)`

**Example:**
- São Paulo, Brazil: `POINT(-46.6333 -23.5505)`
- New York, USA: `POINT(-74.0060 40.7128)`
- London, UK: `POINT(-0.1276 51.5074)`

Note: Longitude comes first, then latitude.

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=ecoxp
```

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Make sure PostgreSQL with PostGIS is running

3. Start the application:
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

4. The API will be available at `http://localhost:3000`

## Testing

Run the test suite:
```bash
npm test

# With coverage
npm run test:cov

# Watch mode
npm run test:watch
```
