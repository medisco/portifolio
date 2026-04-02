export interface Project {
  id: string;
  name: string;
  description: string;
  repository: string;
  liveUrl?: string;
  tags: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "distributed-task-queue",
    description:
      "A Redis-backed distributed task queue with priority lanes, retry logic with exponential backoff, and dead-letter queue support. Processes 50k+ jobs/hour in production.",
    repository: "https://github.com/ismaelm/distributed-task-queue",
    tags: ["Go", "Redis", "gRPC", "Docker"],
    featured: true,
  },
  {
    id: "2",
    name: "postgres-migration-tool",
    description:
      "Zero-downtime schema migration tool for PostgreSQL. Supports blue/green table swaps, concurrent index builds, and rollback detection with automatic lock timeout management.",
    repository: "https://github.com/ismaelm/postgres-migration-tool",
    tags: ["Go", "PostgreSQL", "CLI"],
    featured: true,
  },
  {
    id: "3",
    name: "api-rate-limiter",
    description:
      "Token bucket and sliding window rate limiter middleware for Express/Fastify. Redis-backed for multi-instance deployments, with per-user and per-endpoint granularity.",
    repository: "https://github.com/ismaelm/api-rate-limiter",
    liveUrl: "https://www.npmjs.com/package/api-rate-limiter",
    tags: ["TypeScript", "Node.js", "Redis", "npm"],
    featured: true,
  },
  {
    id: "4",
    name: "event-sourcing-framework",
    description:
      "Lightweight event sourcing and CQRS framework for Node.js. Includes aggregate root base class, event store abstraction, and read-model projection engine.",
    repository: "https://github.com/ismaelm/event-sourcing-framework",
    tags: ["TypeScript", "Node.js", "DDD", "CQRS"],
  },
  {
    id: "5",
    name: "observability-sidecar",
    description:
      "OpenTelemetry sidecar that injects distributed tracing, structured logging, and Prometheus metrics into legacy services without code changes via eBPF hooks.",
    repository: "https://github.com/ismaelm/observability-sidecar",
    tags: ["Go", "eBPF", "OpenTelemetry", "Prometheus"],
  },
  {
    id: "6",
    name: "graphql-persisted-queries",
    description:
      "Automatic persisted query (APQ) implementation for Apollo Server with Redis caching, query depth limiting, and cost analysis to prevent expensive operations.",
    repository: "https://github.com/ismaelm/graphql-persisted-queries",
    tags: ["TypeScript", "GraphQL", "Apollo", "Redis"],
  },
];
