export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string; // ISO 8601 date
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "postgres-index-bloat",
    title: "Diagnosing and Fixing PostgreSQL Index Bloat in Production",
    excerpt:
      "Index bloat silently degrades query performance over time. Here's how to detect it, measure its impact, and reclaim space without taking downtime.",
    content: `## The Problem

After months of heavy write traffic, your PostgreSQL query times start creeping up. EXPLAIN ANALYZE shows the planner is still choosing your indexes, but execution time is climbing. Welcome to index bloat.

## Why It Happens

PostgreSQL uses Multi-Version Concurrency Control (MVCC) to maintain transaction isolation. When you UPDATE or DELETE a row, the old version isn't immediately removed — it's marked dead and remains until VACUUM processes it. Indexes point to the physical location of every row version, not just the current one.

This means:
- 100 updates to a row create 100 index entries (one per version)
- Dead index entries waste space and CPU cycles during index scans
- The index file grows without bound unless VACUUM can clean it up
- When VACUUM can't keep up with write traffic, index bloat accelerates

## Detection

Check index bloat with the pgstattuple extension:

\`\`\`sql
CREATE EXTENSION IF NOT EXISTS pgstattuple;

SELECT * FROM pgstattuple_approx('public.users_email_idx');
\`\`\`

Key metrics:
- \`live_tuples\`: number of live index entries
- \`dead_tuples\`: number of dead entries
- \`dead_tuples / (live_tuples + dead_tuples)\`: bloat ratio

A ratio above 20% is worth investigating. Above 50% means action is needed.

## Solutions

### 1. REINDEX (Offline)
Full rebuild, takes an exclusive lock:

\`\`\`sql
REINDEX INDEX CONCURRENTLY users_email_idx;
\`\`\`

\`CONCURRENTLY\` doesn't lock writes, but takes 2–3× as long.

### 2. CREATE INDEX + DROP (Zero-Downtime)
Create a new index, swap application queries, drop the old one:

\`\`\`sql
-- 1. Build new index concurrently (queries still use old index)
CREATE INDEX users_email_idx_new ON users (email);

-- 2. Swap in application config or run:
ALTER INDEX users_email_idx RENAME TO users_email_idx_old;
ALTER INDEX users_email_idx_new RENAME TO users_email_idx;

-- 3. Drop old index
DROP INDEX users_email_idx_old;
\`\`\`

### 3. Preventive Maintenance
Tune autovacuum for index-heavy tables:

\`\`\`sql
ALTER TABLE users SET (
  autovacuum_vacuum_scale_factor = 0.01,   -- vacuum at 1% changes
  autovacuum_analyze_scale_factor = 0.005  -- analyze at 0.5% changes
);
\`\`\`

Monitor bloat with regular pgstattuple scans and alert at 30%.`,
    tags: ["PostgreSQL", "Performance", "Database"],
    publishedAt: "2026-03-18T09:00:00Z",
  },
  {
    id: "2",
    slug: "distributed-tracing-primer",
    title: "Distributed Tracing Without the Pain: A Practical OpenTelemetry Guide",
    excerpt:
      "OpenTelemetry promises vendor-neutral observability. This guide gets you from zero to correlated traces across microservices in under an hour.",
    content: `## Why Tracing Matters

When a request touches 8 services and takes 3 seconds, logs alone won't tell you where 2 of those seconds went. A trace is a tree of operations, where each leaf shows duration and metadata.

## Quick Wins

### Install OpenTelemetry
\`\`\`bash
npm install @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/sdk-trace-node @opentelemetry/exporter-trace-otlp-http @opentelemetry/auto
\`\`\`

### Bootstrap in index.ts
\`\`\`typescript
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  exporter: new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces'
  })
});

sdk.start();
process.on('SIGTERM', () => sdk.shutdown());
\`\`\`

### Instrument HTTP
\`\`\`typescript
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

registerInstrumentations({
  instrumentations: [new HttpInstrumentation()]
});
\`\`\`

Now every HTTP request and response is automatically traced.

## Manual Spans

For custom logic:

\`\`\`typescript
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('my-service');

const span = tracer.startSpan('process-payment');
try {
  // your code
  span.setStatus({ code: SpanStatusCode.OK });
} catch (err) {
  span.recordException(err);
} finally {
  span.end();
}
\`\`\`

## Correlation IDs

Every trace has a \`trace_id\`. To correlate logs with traces:

\`\`\`typescript
const { trace } = require('@opentelemetry/api');
const context = trace.getActiveSpan()?.spanContext();
const traceId = context?.traceId;

logger.info({ msg: 'payment processed', trace_id: traceId });
\`\`\`

## Storage

Use an open-source collector (Jaeger, Tempo) or commercial (Honeycomb, DataDog).

For local dev, Jaeger in Docker:

\`\`\`bash
docker run -p 16686:16686 -p 4318:4318 jaegertracing/all-in-one
# Visit http://localhost:16686
\`\`\``,
    tags: ["Observability", "OpenTelemetry", "Microservices"],
    publishedAt: "2026-03-05T09:00:00Z",
  },
  {
    id: "3",
    slug: "redis-lua-scripting",
    title: "Atomic Operations in Redis with Lua Scripting",
    excerpt:
      "MULTI/EXEC transactions have sharp edges. Lua scripts are atomic, faster, and composable. Here's everything you need to write production-safe Redis scripts.",
    content: `## The Atomicity Problem

MULTI/EXEC gives you transactions, but with caveats:

\`\`\`
> MULTI
> SET user:1:balance 100
> GET user:1:balance
> EXEC
\`\`\`

If another client writes between GET and EXEC, your transaction doesn't "abort" — you just get the old value. This is Watch-Exec semantics, not true ACID.

Lua scripts are different: they run atomically at the Redis server level, with zero interleaving.

## Hello, Lua

A Lua script that increments a key and returns its new value:

\`\`\`lua
-- KEYS[1] is the key name
-- ARGV[1] is the increment amount
local current = redis.call('GET', KEYS[1])
local new = tonumber(current) + tonumber(ARGV[1])
redis.call('SET', KEYS[1], new)
return new
\`\`\`

From Node.js (using ioredis):

\`\`\`typescript
const result = await redis.eval(script, 1, 'counter', 5);
// args: script, numKeys, key1, arg1
// returns: new value after +5
\`\`\`

## Real-World: Distributed Lock

A safe lock acquire with TTL:

\`\`\`lua
-- KEYS[1] = lock name
-- ARGV[1] = random token
-- ARGV[2] = TTL in milliseconds

if redis.call('EXISTS', KEYS[1]) == 0 then
  redis.call('SET', KEYS[1], ARGV[1], 'PX', ARGV[2])
  return 1  -- lock acquired
else
  return 0  -- lock exists
end
\`\`\`

Release with token check:

\`\`\`lua
-- KEYS[1] = lock name
-- ARGV[1] = random token

if redis.call('GET', KEYS[1]) == ARGV[1] then
  redis.call('DEL', KEYS[1])
  return 1  -- lock released
else
  return 0  -- token mismatch (not our lock)
end
\`\`\`

The token prevents you from deleting a lock acquired by another client.

## Limits

- Scripts have 5-second timeout by default (configurable)
- Can't do blocking operations (BLPOP, etc.)
- Lua 5.1 (older dialect, no table.unpack)
- No access to time; use Redis CLOCK command

For most use cases, these limits don't matter. Script execution is nanoseconds.`,
    tags: ["Redis", "Lua", "Distributed Systems"],
    publishedAt: "2026-02-20T09:00:00Z",
  },
  {
    id: "4",
    slug: "grpc-vs-rest-internal-apis",
    title: "gRPC vs REST for Internal APIs: A Data-Driven Comparison",
    excerpt:
      "REST is familiar, gRPC is fast. But the performance difference depends heavily on payload size and call patterns. Here's what our benchmarks showed.",
    content: `## The Hypothesis

gRPC uses Protocol Buffers (binary) and HTTP/2 multiplexing. REST uses JSON and HTTP/1.1. Theory says gRPC should be faster. But by how much, and does it matter?

## Benchmark Setup

We compared:
- **REST endpoint**: Express.js + JSON, HTTP/1.1
- **gRPC endpoint**: Node.js gRPC server, HTTP/2
- **Payloads**: 1KB, 10KB, 1MB
- **Concurrency**: 1, 10, 100 concurrent clients
- **Load duration**: 30 seconds each

### Results

| Payload | REST P99 | gRPC P99 | Speedup |
|---------|----------|----------|---------|
| 1KB     | 45ms     | 12ms     | 3.75x   |
| 10KB    | 120ms    | 28ms     | 4.3x    |
| 1MB     | 2.1s     | 380ms    | 5.5x    |

## Why gRPC Wins

1. **Binary serialization**: Protocol Buffers is ~10x smaller than JSON for structured data
2. **Multiplexing**: HTTP/2 sends multiple requests on one TCP connection
3. **No text parsing**: Protobuf decoder is faster than JSON.parse()
4. **Compression**: gRPC supports transparent compression (gzip, etc.)

## The Gotchas

### Complexity
REST: curl works. gRPC: need \`grpcurl\` or a gRPC client library.

### Ecosystem
Need to maintain .proto files, regenerate clients, manage versioning.

### Debugging
REST: browser console, logs are readable. gRPC: binary format, need specialized tools.

## Recommendation

Use **gRPC for**:
- High-throughput internal services (>100 RPS)
- Large payloads (>10KB)
- Low-latency requirements (microservices within data center)

Use **REST for**:
- Simple CRUD APIs
- Browser/third-party integrations
- Prototyping and debugging
- Team unfamiliar with gRPC`,
    tags: ["gRPC", "REST", "API Design", "Performance"],
    publishedAt: "2026-02-06T09:00:00Z",
  },
  {
    id: "5",
    slug: "event-sourcing-gotchas",
    title: "Five Event Sourcing Gotchas That Will Bite You in Year Two",
    excerpt:
      "Event sourcing looks clean on day one. Schema evolution, snapshot strategies, and eventual consistency edge cases emerge later. Here's what to prepare for.",
    content: `## 1. Event Schema Evolution

You ship events v1:

\`\`\`json
{ "type": "UserCreated", "userId": "123", "email": "alice@example.com" }
\`\`\`

Six months later, you need to add a phone number field. You can't retroactively add it to old events without replaying history or backfilling.

**Fix**: Version your events.

\`\`\`json
{
  "type": "UserCreated",
  "version": 2,
  "userId": "123",
  "email": "alice@example.com",
  "phoneNumber": "+1234567890"
}
\`\`\`

Have a migration layer:

\`\`\`typescript
function migrateEvent(raw: any): Event {
  if (raw.version === 1) {
    return {
      ...raw,
      version: 2,
      phoneNumber: null
    };
  }
  return raw;
}
\`\`\`

## 2. Snapshot Performance Cliff

As your event stream grows to 100k events, replaying from genesis takes minutes. You add snapshots.

But if snapshots break, recovery is slow. And testing is a nightmare — you need old snapshot files to verify behavior.

**Fix**: Snapshot strategy from day one. Snapshot every N events or every M minutes, not as an afterthought.

\`\`\`typescript
const SNAPSHOT_INTERVAL = 1000; // events

async function loadAggregate(userId: string) {
  const snapshot = await getLatestSnapshot(userId);
  const fromVersion = snapshot?.version ?? 0;
  const events = await getEventsSince(userId, fromVersion);
  return applyEvents(snapshot?.state ?? {}, events);
}
\`\`\`

## 3. Eventual Consistency Headaches

After you emit an event, the read model isn't updated yet. A user refreshes the page and sees stale data.

Without careful UX, users report bugs that don't exist.

**Fixes**:
- **Optimistic updates**: Update the UI immediately, revert on server mismatch
- **Request-response acknowledgment**: Return the new state from the command handler, not the read model
- **Polling**: JavaScript polls for updates every few seconds

## 4. Distributed Transaction Gotcha

Your "PaymentProcessed" event is persisted, but the email notification fails. Now the event happened, but the side effect didn't.

This is the **outbox pattern** problem.

**Fix**: Use an outbox table. Emit events and side-effect records in one transaction.

\`\`\`sql
BEGIN;
  INSERT INTO events (aggregate_id, type, data) VALUES (...);
  INSERT INTO outbox (event_id, action, target) VALUES (...);
COMMIT;

-- Separate service polls outbox, sends notifications, marks as sent
\`\`\`

## 5. Event Deletion (Compliance)

A user requests deletion (GDPR). You can't retroactively remove events from a immutable log.

**Fixes**:
- **Encryption**: Store PII encrypted, delete the key
- **Pseudonymization**: Hash user identifiers, keep historical events
- **Soft delete**: Mark events as "deleted" and skip in replay
- **Rebasing**: For critical compliance, rebuild the stream without sensitive events (rare, expensive)

Most practical teams use encryption + key deletion. The event stays, but the data is unreadable.`,
    tags: ["Event Sourcing", "CQRS", "Architecture", "DDD"],
    publishedAt: "2026-01-22T09:00:00Z",
  },
  {
    id: "6",
    slug: "zero-downtime-postgres-migrations",
    title: "Zero-Downtime PostgreSQL Schema Migrations at Scale",
    excerpt:
      "ALTER TABLE takes a full table lock. At millions of rows, that means minutes of downtime. Here are the techniques we use to migrate schemas without disruption.",
    content: `## The Lock Problem

Most ALTER TABLE operations acquire an AccessExclusiveLock:

\`\`\`sql
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
\`\`\`

This locks the table for writes and reads. At 10 million rows on a busy service, the lock can hold for minutes, causing cascading timeouts.

## Techniques for Zero-Downtime Migrations

### 1. Add Columns (Safe by Default)

Adding a column with a DEFAULT value is safe in PostgreSQL 11+:

\`\`\`sql
ALTER TABLE users ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL;
\`\`\`

PostgreSQL stores the default value metadata without rewriting every row. Reads and writes proceed normally.

### 2. Add NOT NULL Constraint (Two-Phase)

\`\`\`sql
-- Phase 1: Add constraint as NOT VALID (non-blocking)
ALTER TABLE users ADD CONSTRAINT users_email_not_null CHECK (email IS NOT NULL) NOT VALID;

-- Phase 2: Validate in background (during low-traffic window)
ALTER TABLE users VALIDATE CONSTRAINT users_email_not_null;
\`\`\`

Phase 1 returns immediately. Phase 2 scans the table but doesn't lock writes.

### 3. Rename Columns (Swap Strategy)

To rename a column, don't use ALTER TABLE RENAME:

\`\`\`sql
-- Step 1: Add new column
ALTER TABLE users ADD COLUMN username_new VARCHAR(255);

-- Step 2: Populate (in batches, if large table)
UPDATE users SET username_new = username WHERE username_new IS NULL LIMIT 10000;

-- Step 3: Add trigger to keep in sync
CREATE TRIGGER username_sync BEFORE INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION sync_username_columns();

-- Step 4: Update application to use username_new (deploy code)

-- Step 5: Drop old column (after confident application uses new column)
ALTER TABLE users DROP COLUMN username;
ALTER TABLE users RENAME COLUMN username_new TO username;
\`\`\`

### 4. Rebuild Indexes Concurrently

\`\`\`sql
-- Doesn't lock writes
REINDEX INDEX CONCURRENTLY users_email_idx;
\`\`\`

### 5. Blue-Green Table Swap

For large schema changes:

\`\`\`sql
-- 1. Create new table with desired schema
CREATE TABLE users_new (LIKE users INCLUDING ALL);
ALTER TABLE users_new ADD COLUMN phone VARCHAR(20);

-- 2. Copy data in background
INSERT INTO users_new SELECT * FROM users;

-- 3. Sync ongoing changes with trigger
CREATE TRIGGER sync_to_new AFTER INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION insert_or_update_users_new();

-- 4. Swap (brief lock, milliseconds)
ALTER TABLE users RENAME TO users_old;
ALTER TABLE users_new RENAME TO users;
DROP TABLE users_old;
\`\`\`

## Checklist

- [ ] Test migration on production-scale data locally
- [ ] Have a rollback plan
- [ ] Monitor lock times during migration: \`SELECT * FROM pg_locks;\`
- [ ] Set \`lock_timeout\` to fail fast if lock holds too long
- [ ] Deploy application code BEFORE schema changes (forward-compatibility)
- [ ] Run migrations during low-traffic window if possible
- [ ] Verify application still works on new schema`,
    tags: ["PostgreSQL", "Database", "DevOps", "Reliability"],
    publishedAt: "2026-01-08T09:00:00Z",
  },
  {
    id: "7",
    slug: "typescript-branded-types",
    title: "Branded Types in TypeScript: Catching Business Logic Bugs at Compile Time",
    excerpt:
      "Passing a UserId where an OrderId is expected is a runtime bug TypeScript misses. Branded types close this gap with zero runtime cost.",
    content: `## The Problem with Primitive Obsession

\`\`\`typescript
type UserId = string;
type OrderId = string;

function getUserOrders(userId: UserId): Order[] {
  return orders.filter(o => o.userId === userId);
}

function getOrder(orderId: OrderId): Order | null {
  return orders.find(o => o.id === orderId);
}

// TypeScript allows this, but it's wrong:
const uid: UserId = "user-123";
const order = getOrder(uid); // userId passed as orderId!
\`\`\`

\`UserId\` and \`OrderId\` are both just \`string\`. TypeScript can't distinguish them.

## Branded Types to the Rescue

\`\`\`typescript
// A UserId is a string, but "branded" as distinct
type UserId = string & { readonly __brand: 'UserId' };
type OrderId = string & { readonly __brand: 'OrderId' };

// Helper to create branded types
function userId(id: string): UserId {
  return id as UserId;
}

function orderId(id: string): OrderId {
  return id as OrderId;
}

// Now TypeScript catches the mistake:
const uid = userId("user-123");
const order = getOrder(uid); // ❌ Type error: UserId is not assignable to OrderId
\`\`\`

## At Runtime

Branded types are **zero-cost abstractions**:

\`\`\`typescript
const uid = userId("user-123");
console.log(typeof uid); // "string"
console.log(uid === "user-123"); // true
\`\`\`

The brand is only for TypeScript's type checker. At runtime, it's just a string.

## Real-World Example

\`\`\`typescript
// Branded types
type CustomerId = string & { readonly __brand: 'CustomerId' };
type AccountId = string & { readonly __brand: 'AccountId' };
type TransactionId = string & { readonly __brand: 'TransactionId' };

// Factory functions (usually autogenerated from DB)
const customerId = (id: string): CustomerId => id as CustomerId;
const accountId = (id: string): AccountId => id as AccountId;
const transactionId = (id: string): TransactionId => id as TransactionId;

// API client
interface CreateTransactionRequest {
  customerId: CustomerId;
  accountId: AccountId;
  amount: number;
}

function createTransaction(req: CreateTransactionRequest): Promise<TransactionId> {
  // TypeScript ensures the right IDs are passed
  return api.post('/transactions', req).then(res => transactionId(res.id));
}

// Usage
const cid = customerId("cust-456");
const aid = accountId("acct-789");

// ✅ TypeScript allows this
const tid = createTransaction({ customerId: cid, accountId: aid, amount: 100 });

// ❌ TypeScript catches this mistake
const tid2 = createTransaction({ customerId: aid, accountId: cid, amount: 100 });
//                                            ^ Type error
\`\`\`

## Library Support

Some libraries provide branded types:

- **io-ts**: Runtime type checking with branded type derivation
- **newtype-ts**: Explicit NewType pattern for Haskell-like semantics
- **Effect**: Functional library with built-in branded type utilities

For most projects, DIY brands are sufficient and lightweight.`,
    tags: ["TypeScript", "Type Safety", "Backend"],
    publishedAt: "2025-12-15T09:00:00Z",
  },
  {
    id: "8",
    slug: "connection-pool-tuning",
    title: "Connection Pool Tuning for Node.js + PostgreSQL Under Load",
    excerpt:
      "Wrong pool settings cause timeouts under load OR starve the database at peak. This post walks through the math and the monitoring signals that matter.",
    content: `## Why Pools Matter

Each PostgreSQL connection costs:
- ~5-10MB of server RAM
- A dedicated process
- TCP setup overhead

At 10,000 concurrent connections, PostgreSQL might hit memory limits or process limits before request limits.

Connection pools let you reuse a fixed set of connections across many application instances.

## Pool Configuration

Using \`pg\` library for Node.js:

\`\`\`typescript
const { Pool } = require('pg');

const pool = new Pool({
  max: 20,                 // Max connections to keep open
  min: 5,                  // Min idle connections to maintain
  idleTimeoutMillis: 30000, // Idle connection TTL (30s)
  connectionTimeoutMillis: 5000, // Timeout waiting for available connection
});
\`\`\`

## Tuning for Load

### Rule of Thumb
\`\`\`
Pool Size = (Num Cores × 2) + Effective Spindle Count
\`\`\`

For a 4-core machine: (4 × 2) + 0 = 8 connections.

For databases with SSD: use 2 × cores = 8 connections.

### Under Load: Requests Timeout

Symptom: "getConnection() timeout exceeded"

\`\`\`typescript
const pool = new Pool({
  max: 20,
  min: 10,  // Increase min idle connections
  connectionTimeoutMillis: 10000, // Increase timeout to 10s
});
\`\`\`

Monitor connection utilization:

\`\`\`typescript
setInterval(() => {
  console.log(\`Pool: \${pool.totalCount} total, \${pool.idleCount} idle\`);
  if (pool.idleCount === 0) {
    console.warn('Pool exhausted, increasing max');
  }
}, 5000);
\`\`\`

### Idle Connections Pile Up

Symptom: \`select count(*) from pg_stat_activity\` shows 1000+ connections.

Culprit: Long \`idleTimeoutMillis\` or applications that never close connections.

\`\`\`typescript
const pool = new Pool({
  idleTimeoutMillis: 10000, // Reduce from 30s to 10s
  connectionTimeoutMillis: 3000, // Aggressive timeout
  statement_timeout: '30s', // Database-side timeout (prevent hanging queries)
});
\`\`\`

### Query Hangs Block the Pool

If a query hangs, the connection is held until timeout. Every waiting request consumes memory and a slot from the pool.

\`\`\`typescript
// Add timeout to queries
const result = await pool.query(
  { text: 'SELECT * FROM large_table', timeout: 5000 },
  [userId]
);
\`\`\`

## Monitoring

Key metrics:
- **Connections active**: number of queries in progress
- **Connections idle**: available connections
- **Queue depth**: requests waiting for a connection
- **Connection latency**: time to acquire a connection

Example Prometheus metrics:

\`\`\`typescript
const prometheus = require('prom-client');

const poolTotal = new prometheus.Gauge({
  name: 'pg_pool_total_connections',
  help: 'Total connections in pool',
});

const poolIdle = new prometheus.Gauge({
  name: 'pg_pool_idle_connections',
  help: 'Idle connections available',
});

setInterval(() => {
  poolTotal.set(pool.totalCount);
  poolIdle.set(pool.idleCount);
}, 5000);
\`\`\`

## Checklist

- [ ] Set max = 2 × CPU cores as baseline
- [ ] Set min = 1/2 of max (reduce startup time)
- [ ] Set idleTimeoutMillis = 10–30s (avoid idle connection waste)
- [ ] Set connectionTimeoutMillis = 5s (fail fast on pool exhaustion)
- [ ] Add database statement_timeout (prevent hanging queries from blocking pool)
- [ ] Monitor pool.totalCount and pool.idleCount in production
- [ ] Alert when idleCount === 0 (pool exhaustion)
- [ ] Set up slow query logging (queries > 1s)`,
    tags: ["Node.js", "PostgreSQL", "Performance", "Database"],
    publishedAt: "2025-11-30T09:00:00Z",
  },
];
