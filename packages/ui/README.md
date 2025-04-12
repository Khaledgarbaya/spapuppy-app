# @repo/ui

Shared UI components library built with shadcn/ui for the SpaPuppy App.

## Overview

This package contains reusable UI components that are shared across the SpaPuppy application. The components are built using shadcn/ui, providing a consistent and beautiful design system.

## Installation

```bash
pnpm add @repo/ui
```

## Usage

```tsx
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";

export default function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

## Adding New Components

To add a new shadcn/ui component:

```bash
pnpm ui:add:component <component-name>
```

## Available Components

- Button
- Card
- Dialog
- Input
- Select
- Toast
- ... and more

Each component is customizable and follows the design system's theme. 
