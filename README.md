# Cosmos Wallet Integration

A testnet dashboard for connecting a Keplr or Leap wallet to Cosmos-based networks, inspecting balances, managing delegations, claiming rewards, and voting on governance proposals.

**Live demo:** [wallet-integration-two.vercel.app](https://wallet-integration-two.vercel.app)

> [!IMPORTANT]
> This project is configured for testnets. Do not send mainnet assets to addresses or transactions shown by the application.

## What I built

- Wallet discovery and connection with Keplr and Leap
- Network switching across Cosmos Hub, Osmosis, and Dymension testnets
- Available, delegated, and reward balance queries
- Delegate, redelegate, undelegate, and reward-withdrawal transactions
- Governance proposal browsing and voting
- Transaction feedback and targeted React Query cache refreshes
- Responsive interfaces built with Next.js, TypeScript, Tailwind CSS, and Radix UI

## Technical approach

The application keeps chain metadata in `src/constants/chainInfos`, wallet state in `WalletProvider`, and Cosmos clients behind `useCosmjs`. Query hooks load account, staking, reward, validator, and governance data. Mutation hooks submit signed transactions and refresh only the affected queries after confirmation.

Dymension uses a separate EVM-compatible signing path; Cosmos Hub and Osmosis use CosmJS `signAndBroadcast`.

## Supported testnets

| Network | Chain ID |
| --- | --- |
| Cosmos Hub testnet | `theta-testnet-001` |
| Osmosis testnet | `osmo-test-5` |
| Dymension testnet | `froopyland_100-1` |

Public RPC or REST endpoints can change or be rate-limited. A failed request does not necessarily mean the wallet or account is invalid.

## Run locally

Requirements:

- Node.js 20+
- npm
- Keplr or Leap browser extension
- Testnet tokens for transaction flows

```sh
git clone https://github.com/MargeryOlethea/wallet-integration.git
cd wallet-integration
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```sh
npm run lint
npm run build
```

GitHub Actions runs both checks for pull requests and pushes to `main`.

## Project status

I built this project on my own to learn the Cosmos wallet and transaction stack end to end. It is not a hosted wallet, custody service, or audited financial product. Wallet extensions retain responsibility for key management and require the user to approve every transaction.
