# FWDX Official Token List

This repository contains a Node.js script that automatically fetches JSON data from various APIs and commits the updated data files to this GitHub repository. The automation is handled by GitHub Actions, which schedules the script to run daily.

## Overview

The project aims to maintain an up-to-date collection of data from multiple sources by fetching the data periodically and storing it in a structured format. This can be particularly useful for data analysis, monitoring changes in the data over time, or providing a reliable backup for third-party data.

## How It Works

The repository utilizes GitHub Actions to run a Node.js script (`getTokenList.mjs`) that fetches data from predefined URLs, writes this data to JSON files within the repository, and commits any changes. The workflow is triggered automatically each day at midnight UTC.

### Data Sources

The current configuration fetches data from the following sources:

- **Linea**: Data related to Linea's mainnet tokens.
- **Ethereum**: Comprehensive data from Uniswap tokens on Ethereum.
- **Binance**: Token data from PancakeSwap on the Binance Smart Chain.
- **Avalanche**: Token data from various DApps on Avalanche.
- **Polygon**: Details about tokens running on the Polygon network.
- **Base**: Information regarding tokens on the Base chain.

Each of these data sources updates a corresponding JSON file in the `tokens` directory of this repository.

## License

This project is released under the [MIT License](LICENSE).
