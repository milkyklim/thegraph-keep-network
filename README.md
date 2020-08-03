# Keep Network Subgraph

![License](https://img.shields.io/badge/license-MIT-green)
![CI](https://github.com/milkyklim/thegraph-keep-network/workflows/CI/badge.svg)

Subgraph to track status of grants' on both Mainnet and Ropsten networks.

Live versions:

- [Mainnet](https://thegraph.com/explorer/subgraph/milkyklim/keep-network)
- [Ropsten](https://thegraph.com/explorer/subgraph/milkyklim/keep-network-ropsten)

# Setup

- Copy `.envrc.example` to `.envrc`.
- Set your The Graph `ACCESS_TOKEN`.
- Set network environment variables:

Ropsten:

```
NETWORK="ropsten"
GRAPH_PATH="milkyklim/keep-network-ropsten"
```

Mainnet:

```
NETWORK="mainnet"
GRAPH_PATH="milkyklim/keep-network"
```

# Running

- `yarn` – install dependencies
- `yarn codegen` – generate code
- `yarn create` – allocate subgraph name in Graph Node
- `yarn deploy` - deploy supgraph to Graph Node
- `yarn publish-graph` – run all steps in one command
