# @repo/tsconfig

Shared TypeScript configurations for the SpaPuppy App.

## Overview

This package contains base TypeScript configuration files that are shared across the SpaPuppy application. It ensures consistent TypeScript settings and compiler options across all packages and applications.

## Installation

```bash
pnpm add -D @repo/tsconfig
```

## Usage

In your `tsconfig.json`:

```json
{
  "extends": "@repo/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

## Available Configurations

- `base.json` - Base configuration for all TypeScript projects
- `nextjs.json` - Configuration for Next.js applications
- `react-library.json` - Configuration for React libraries
- `node-library.json` - Configuration for Node.js libraries

## Features

- Strict type checking enabled
- Modern ECMAScript features
- Path aliases support
- Consistent module resolution
- Optimized for development and production 
