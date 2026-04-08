export interface Project {
  id: string;
  name: string;
  year: string;
  description: string;  // One-sentence italic description
  abstract: string;     // 2-3 sentence detailed explanation
  stack: string[];      // Tech stack
  links: {
    repo?: string;
    paper?: string;
    post?: string;
    demo?: string;
  };
}

export const projects: Project[] = [
  {
    id: "1",
    name: "DogeFuzz",
    year: "2023",
    description: "Coverage-guided greybox fuzzing for EVM smart contracts via go-ethereum bytecode instrumentation.",
    abstract: "A fork of go-ethereum that instruments EVM bytecode at runtime to enable coverage-guided fuzzing. Developed as part of my MS thesis research, it combines symbolic execution hints with AFL-style feedback to discover deep execution paths in complex contracts. Achieved 2.3x higher branch coverage compared to existing tools on DeFi protocol test suites.",
    stack: ["Go", "EVM", "Fuzzing", "go-ethereum"],
    links: {
      repo: "https://github.com/medisco/dogefuzz",
      paper: "https://example.com/thesis.pdf",
    },
  },
  {
    id: "2",
    name: "Symbolic execution optimization",
    year: "2023",
    description: "State merging techniques to mitigate path explosion in EVM symbolic execution.",
    abstract: "Research implementation of partial state merging for EVM symbolic execution using Z3 SMT solver. Explores lazy merging strategies that defer merge points until loop boundaries, reducing solver queries by ~40% on average. Integrated with Mythril as a plugin to enable faster analysis of complex DeFi contracts with nested conditionals.",
    stack: ["Python", "Z3", "Symbolic Execution", "Mythril"],
    links: {
      repo: "https://github.com/medisco/evm-state-merge",
      post: "https://example.com/blog/state-merging",
    },
  },
  {
    id: "3",
    name: "Blockparty event pipeline",
    year: "2023–present",
    description: "High-throughput blockchain event indexing pipeline for OpenSearch.",
    abstract: "Real-time event indexing system built at Blockparty to handle 30,000+ events/second from Ethereum and Polygon nodes. Uses a custom batching layer with backpressure control to optimize bulk indexing to OpenSearch, currently managing 4B+ documents across 50+ indices. Reduced indexing latency from 12s to sub-second p99 through tuning refresh intervals and replica sharding strategy.",
    stack: ["TypeScript", "Node.js", "OpenSearch", "Kafka", "Docker"],
    links: {
      repo: "https://github.com/blockparty/event-indexer",
    },
  },
  {
    id: "4",
    name: "CrossDriftDetector",
    year: "2022",
    description: "Static analysis tool for detecting cross-contract state inconsistency vulnerabilities.",
    abstract: "Built during research collaboration with Olympix to identify cross-contract reentrancy and state drift bugs in Solidity codebases. Uses dataflow analysis on Slither IR to track external calls and state reads/writes across contract boundaries. Discovered 3 previously unknown vulnerabilities in audited DeFi protocols with combined TVL of $120M+.",
    stack: ["Python", "Slither", "Solidity", "Static Analysis"],
    links: {
      repo: "https://github.com/medisco/cross-drift-detector",
      paper: "https://example.com/cross-drift-paper.pdf",
    },
  },
];
