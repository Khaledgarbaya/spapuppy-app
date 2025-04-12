# @repo/types

Shared TypeScript types and interfaces for the SpaPuppy App.

## Overview

This package contains common TypeScript types, interfaces, and enums that are shared across the SpaPuppy application. It ensures type consistency between the frontend and backend.

## Installation

```bash
pnpm add @repo/types
```

## Usage

```typescript
import { Puppy, PuppyStatus } from "@repo/types";

const puppy: Puppy = {
  id: "1",
  name: "Max",
  breed: "Golden Retriever",
  ownerName: "John Doe",
  ownerPhone: "(555) 123-4567",
  service: "Full Grooming",
  status: PuppyStatus.WAITING,
  arrivalTime: "09:00 AM"
};
```

## Available Types

- `Puppy` - Represents a puppy in the waiting list
- `PuppyStatus` - Enum for puppy service status
- `WaitingList` - Represents a daily waiting list
- `ApiResponse` - Common API response types
- ... and more

## Contributing

When adding new types:
1. Ensure they are properly exported
2. Add JSDoc comments for better documentation
3. Keep types consistent with database schema
4. Update this README if adding major new types 
