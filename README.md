# SmartCription

## Development
### Requirements
```sh
npm i
```
### Setup
### Testing
- Run in shell
```sh
npx hardhat test
```
- Run specific test
```sh
npx hardhat test --grep "<pattern>"
```
### Coverage
- Run in shell
```sh
npx hardhat coverage
```

## Deployment
### Setup
- `cp .env.example .env`
- Fill in the values in `.env`, especially the `MEDIC_ADDRESS` and `PHARMA_ADDRESS` values that you can get from Metamask
- Setup the hardhat local node
```sh
npx hardhat node
```
- Deploy the contracts
```sh
npx hardhat run scripts/deploy.ts --network localhost
```

## Help
Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
```
