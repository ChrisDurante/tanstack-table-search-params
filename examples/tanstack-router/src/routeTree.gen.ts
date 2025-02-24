/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PushImport } from './routes/push'
import { Route as DebounceImport } from './routes/debounce'
import { Route as CustomParamNameImport } from './routes/custom-param-name'
import { Route as CustomEncoderDecoderImport } from './routes/custom-encoder-decoder'
import { Route as CustomDefaultValueImport } from './routes/custom-default-value'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const PushRoute = PushImport.update({
  path: '/push',
  getParentRoute: () => rootRoute,
} as any)

const DebounceRoute = DebounceImport.update({
  path: '/debounce',
  getParentRoute: () => rootRoute,
} as any)

const CustomParamNameRoute = CustomParamNameImport.update({
  path: '/custom-param-name',
  getParentRoute: () => rootRoute,
} as any)

const CustomEncoderDecoderRoute = CustomEncoderDecoderImport.update({
  path: '/custom-encoder-decoder',
  getParentRoute: () => rootRoute,
} as any)

const CustomDefaultValueRoute = CustomDefaultValueImport.update({
  path: '/custom-default-value',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/custom-default-value': {
      id: '/custom-default-value'
      path: '/custom-default-value'
      fullPath: '/custom-default-value'
      preLoaderRoute: typeof CustomDefaultValueImport
      parentRoute: typeof rootRoute
    }
    '/custom-encoder-decoder': {
      id: '/custom-encoder-decoder'
      path: '/custom-encoder-decoder'
      fullPath: '/custom-encoder-decoder'
      preLoaderRoute: typeof CustomEncoderDecoderImport
      parentRoute: typeof rootRoute
    }
    '/custom-param-name': {
      id: '/custom-param-name'
      path: '/custom-param-name'
      fullPath: '/custom-param-name'
      preLoaderRoute: typeof CustomParamNameImport
      parentRoute: typeof rootRoute
    }
    '/debounce': {
      id: '/debounce'
      path: '/debounce'
      fullPath: '/debounce'
      preLoaderRoute: typeof DebounceImport
      parentRoute: typeof rootRoute
    }
    '/push': {
      id: '/push'
      path: '/push'
      fullPath: '/push'
      preLoaderRoute: typeof PushImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  CustomDefaultValueRoute,
  CustomEncoderDecoderRoute,
  CustomParamNameRoute,
  DebounceRoute,
  PushRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/custom-default-value",
        "/custom-encoder-decoder",
        "/custom-param-name",
        "/debounce",
        "/push"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/custom-default-value": {
      "filePath": "custom-default-value.tsx"
    },
    "/custom-encoder-decoder": {
      "filePath": "custom-encoder-decoder.tsx"
    },
    "/custom-param-name": {
      "filePath": "custom-param-name.tsx"
    },
    "/debounce": {
      "filePath": "debounce.tsx"
    },
    "/push": {
      "filePath": "push.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
