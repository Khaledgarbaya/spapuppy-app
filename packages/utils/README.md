# @repo/utils

Shared utility functions and hooks for the SpaPuppy App.

## Overview

This package contains common utility functions, hooks, and helpers that are shared across the SpaPuppy application. It provides reusable logic for common operations and functionality.

## Installation

```bash
pnpm add @repo/utils
```

## Usage

```typescript
import { formatDate, formatPhoneNumber } from "@repo/utils/formatting";
import { useDebounce } from "@repo/utils/hooks";

// Format a date
const formattedDate = formatDate(new Date(), "yyyy-MM-dd");

// Format a phone number
const formattedPhone = formatPhoneNumber("5551234567"); // (555) 123-4567

// Use a debounced value
function SearchComponent() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  
  // ... rest of the component
}
```

## Available Utilities

### Formatting
- `formatDate` - Date formatting using date-fns
- `formatPhoneNumber` - Phone number formatting
- `formatCurrency` - Currency formatting

### Hooks
- `useDebounce` - Debounce values
- `useLocalStorage` - Local storage state management
- `useMediaQuery` - Responsive media queries

### Validation
- `validatePhoneNumber` - Phone number validation
- `validateEmail` - Email validation

### API
- `handleApiError` - Common API error handling
- `createQueryString` - URL query string creation

## Contributing

When adding new utilities:
1. Add proper TypeScript types
2. Include JSDoc documentation
3. Add unit tests
4. Update this README with new functionality 
