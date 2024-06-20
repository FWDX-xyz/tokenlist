// getTokenList.mjs
import fs from 'fs';
import fetch from 'node-fetch';
import { execSync } from 'child_process';

// Function to configure Git user for commit operations
const setupGit = () => {
    execSync('git config --global user.name "GitHub Actions"');
    execSync('git config --global user.email "actions@github.com"');
};

// Function to push changes to the repository
const pushChanges = () => {
    execSync('git add tokens/');
    try {
        execSync('git commit -m "Update tokens files"');
        execSync('git push --set-upstream origin HEAD');
    } catch (error) {
        if (!error.message.includes('nothing to commit')) {
            console.error('Error during commit or push:', error);
        }
    }
};

const urls = {
    linea: 'https://raw.githubusercontent.com/Consensys/linea-token-list/main/json/linea-mainnet-token-fulllist.json',
    ethereum: 'https://tokens.coingecko.com/uniswap/all.json',
    binance: 'https://tokens.pancakeswap.finance/coingecko.json',
    avalanche: 'https://tokens.coingecko.com/avalanche/all.json',
    polygon: 'https://tokens.coingecko.com/polygon-pos/all.json',
    base: 'https://tokens.coingecko.com/base/all.json'
};

const minUrls = {
    linea: "https://tokens.pancakeswap.finance/pancakeswap-linea-default.json",
    ethereum: "https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/gemini/ethereum.tokenlist.json",
    binance: "https://tokens.pancakeswap.finance/pancakeswap-extended.json",
    avalanche: "https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/gemini/avalanche.tokenlist.json",
    polygon: "https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/gemini/polygon.tokenlist.json",
    base: "https://tokens.pancakeswap.finance/pancakeswap-base-default.json"
}

const fetchDataAndUpdateRepo = async () => {
    try {
        setupGit();
        await Promise.all(Object.entries(urls).map(async ([name, url]) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} for ${name}`);
            }
            const data = await response.json();
            const filePath = `tokens/mainnet/${name}.json`;
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Data written for ${name}`);
        }));

        await Promise.all(Object.entries(minUrls).map(async ([name, url]) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} for ${name}`);
            }
            const data = await response.json();
            const filePath = `tokens/mainnet/${name}-default.json`;
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Data written for ${name}-default`);
        }));

        pushChanges();
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

// Run the function
fetchDataAndUpdateRepo();
