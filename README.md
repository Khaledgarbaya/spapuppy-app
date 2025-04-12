# SpaPuppy App

A modern web application for managing a pet grooming salon's waiting list, built with Next.js, Turborepo, and shadcn/ui.

## Project Structure

This is a monorepo using Turborepo with pnpm workspaces. The project is structured as follows:

```sh
spapuppy-app/
├── apps/
│   ├── frontend/     # Next.js frontend application
│   ├── backend/      # Nestjs Backend API server
├── packages/
│   ├── ui/          # Shared UI components using shadcn/ui
│   ├── tsconfig/    # Shared TypeScript configuration
│   └── types/       # Shared TypeScript types

└── package.json     # Root package.json for workspace management
```

## Prerequisites

- Node.js >= 18
- pnpm >= 8.6.0

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Khaledgarbaya/spapuppy-app.git
cd spapuppy-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:

Create `.env` files in both frontend and backend apps:

For `apps/frontend/.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:12345
```

For `apps/backend/.env`:
```env
DATABASE_URL="./dev.db"
PORT=12345
```

4. Set up the database:
```bash
cd apps/backend
pnpm prisma generate  # Generate Prisma client
pnpm prisma migrate dev  # Run migrations
pnpm prisma db seed  # Seed the database with initial data
```

5. Start the development servers:
```bash
# From the root directory
pnpm dev  # This will start both frontend and backend
```

The application will be available at:
- Frontend: http://localhost:3001
- Backend API: http://localhost:12345

## How to add a new dependency

```bash
pnpm add <dependency> --filter @repo/<package>
# Example:
pnpm add date-fns --filter @repo/frontend
# Globally
pnpm add <dependency> -w    
```

## Available Scripts

### Root Directory

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm test` - Run all tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm test:e2e:watch` - Run end-to-end tests in watch mode with UI
- `pnpm lint` - Lint all files
- `pnpm lint:fix` - Lint and fix all files

### Frontend (apps/frontend)

- `pnpm dev` - Start the Next.js development server
- `pnpm build` - Build the frontend application
- `pnpm start` - Start the production server
- `pnpm test:e2e` - Run frontend end-to-end tests
- `pnpm lint` - Lint frontend files

### Backend (apps/backend)

- `pnpm dev` - Start the backend development server
- `pnpm build` - Build the backend application
- `pnpm start` - Start the production server
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Run database migrations
- `pnpm prisma:seed` - Seed the database
- `pnpm test` - Run backend tests

## Development

### Database Management

The backend uses Prisma as the ORM. Common database operations:

```bash
cd apps/backend

# Create a new migration
pnpm prisma migrate dev --name <migration-name>

# Reset the database (caution: this will delete all data)
pnpm prisma migrate reset

# View the database with Prisma Studio
pnpm prisma studio
```

### Adding UI Components

The project uses shadcn/ui for components. To add a new component:

```bash
pnpm ui:add:component <component-name>
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run end-to-end tests
pnpm test:e2e

# Run end-to-end tests with UI
pnpm test:e2e:watch

# Run tests with coverage
pnpm test:cov
```

## Features

- Real-time waiting list management
- Add and remove puppies from the list
- Track puppy service status
- Search and filter functionality
- Daily list management
- Responsive design

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
