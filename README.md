# my-backend-api

Backend API generated with **create-tbk-app** using the **full** preset.

## Features

- TypeScript + Express.js
- MongoDB with Mongoose
- Auto-generated OpenAPI documentation
- Type-safe routing with MagicRouter
- Structured logging with Pino
- JWT Authentication with Session Management (redis)
- Security hardening (Helmet, CORS, Rate Limiting)
- Caching (Redis)
- Background jobs (BullMQ)
- Queue monitoring dashboard
- File storage (S3)
- Email sending (resend)
- Real-time features (Socket.IO)
- Admin panel
- Full observability (Logging, Metrics, Health checks)

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- MongoDB
- Redis

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env.development
```

3. Update `.env.development` with your configuration

> **Note:** Configure your AWS/R2 credentials for file storage

> **Note:** Configure your resend API key for email sending

4. Start development server:

```bash
pnpm dev
```

## Available Commands

```bash
pnpm dev           # Start dev server with hot reload
pnpm build         # Build for production
pnpm start:prod    # Run production build
pnpm typecheck     # Type check without building
pnpm lint          # Run ESLint
pnpm lint:fix      # Auto-fix linting issues
pnpm tbk docs:openapi       # Generate OpenAPI spec
pnpm tbk docs:sdk          # Generate TypeScript SDK
```

## CLI Tool

Generate new modules, plugins, and more:

```bash
pnpm tbk generate:module <name>     # Generate CRUD module
pnpm tbk generate:plugin <name>     # Generate plugin
pnpm tbk generate:middleware <name> # Generate middleware
pnpm tbk make:factory <module>/<name>    # Generate factory
pnpm tbk make:seeder <module>/<name>     # Generate seeder
pnpm tbk seed                            # Run seeders
```

## API Documentation

Once the server is running, visit:

- **Swagger UI:** http://localhost:3000/docs
- **OpenAPI Spec:** http://localhost:3000/openapi.yml

## Monitoring

- **Health Check:** http://localhost:3000/ops/health
- **Metrics:** http://localhost:3000/ops/metrics

## Admin Panel

Access the admin panel at http://localhost:3000/admin

Default credentials (change in `.env.development`):
- Username: admin
- Password: change-this-password

## Queue Dashboard

Monitor background jobs at http://localhost:3000/queues

## Real-time Testing

Test Socket.IO at http://localhost:3000/realtime

## Project Structure

```
src/
??? app/              # Application setup
??? config/           # Configuration
??? lib/              # Core libraries
??? middlewares/      # Express middlewares
??? modules/          # Feature modules
??? plugins/          # Plugin system
??? routes/           # Route registration
??? utils/            # Utilities
??? main.ts           # Entry point
```

## Learn More

- [TypeScript Backend Toolkit Documentation](https://github.com/your-repo)
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

## License

ISC