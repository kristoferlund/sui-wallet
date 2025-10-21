# A multiuser Sui wallet built on the Internet Computer (ICP)

This multiuser Sui wallet allows the user to generate a Sui
address by logging in with their Internet Identity. The user can then send and receive Sui tokens to other users.

The backend canister uses the [Sui API](https://docs.sui.io/) to interact with the Sui blockchain.

The frontend is built with React and Vite.

> [!TIP]
> Use this repository as a starting point for building your own multiuser Sui wallet on the Internet Computer.

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]](LICENSE)


## Try it!

ICP Ninja is a browser IDE for creating Internet Computer (ICP) smart contracts. Write and deploy entire applications directly onchain from the browser. Deploy this example in less than a minute:

[![](https://icp.ninja/assets/open.svg)](https://icp.ninja/i?g=https://github.com/kristoferlund/sui_wallet/tree/ninja)

You can also try two predeployed versions of the wallet:

Mainnet: <https://unenw-dyaaa-aaaac-a3e6a-cai.icp0.io>

Testnet: <https://mcejh-aqaaa-aaaan-qz4la-cai.icp0.io>

![](./media/screenshot.png)

## Project notes

At all times when interacting with canisters on the IC you should consider the
costs involved, and the fact that update calls take 2-3 seconds to complete. To
create a good user experience, this wallet uses a combination of local state and
canister calls to provide a responsive UI.

- The Sui address is stored in local state after the user logs in. Next
  time the user logs in, the address is retrieved from local state.
- The balance of the Sui address is queried from the backend canister that in
  turn queries the Sui API. A more efficient way to query the balance would be to call the Sui API directly from the frontend.

> [!IMPORTANT]
> This project is not affiliated with or endorsed by the DFINITY Foundation. It has not undergone any formal security review and is intended for educational and experimental purposes only. Do not use this code in production environments.

## Setup, pre-requisites

Setup your Internet Computer developer environment.

[https://internetcomputer.org/docs/current/developer-docs/](https://internetcomputer.org/docs/current/developer-docs/)

## Deploying the project

### 1. Start the Internet Computer

```bash
dfx start --clean
```

### 2. Install dependencies

```
pnpm install
```

### 3. Deploy the canisters

```
dfx deploy
```

When asked to select a network, choose `regtest`.

> [!TIP]
> If you get a permissions error when deploying, you might need to set the execute
> bit on the build script.
>
> ```
> chmod +x build.sh
> ```

## Develop

During development, you can run the frontend with hot reloading using Vite.

```bash
pnpm run dev
```

## Before you start testing

> [!IMPORTANT]
> Make sure your Sui testnet configuration is set up correctly and you have testnet tokens for testing transactions.

## Backend canister methods

### `get_address`

Get the Sui address for the calling principal or for the principal
specified in the call parameters.

Call signature:

```
type AddressResult = variant { Ok : text; Err : text };

get_address : (owner: opt principal) -> (AddressResult);
```

Get the Sui address for the calling principal:

```bash
dfx canister call backend get_address
```

Get the Sui address for a specified principal:

```bash
dfx canister call backend get_address '(opt principal "hkroy-sm7vs-yyjs7-ekppe-qqnwx-hm4zf-n7ybs-titsi-k6e3k-ucuiu-uqe")'
```

### `get_balance`

Returns the Sui balance of the address controlled by a principal.

Call signature:

```
type BalanceResult = variant { Ok : nat64; Err : text };

get_balance : (owner: opt principal) -> (BalanceResult);
```

Get the Sui balance for the calling principal:

```bash
dfx canister call backend get_balance
```

Get the Sui balance for a specified principal:

```bash
dfx canister call backend get_balance '(opt principal "hkroy-sm7vs-yyjs7-ekppe-qqnwx-hm4zf-n7ybs-titsi-k6e3k-ucuiu-uqe")'
```

### `send_sui`

Sends Sui from the address controlled by the calling principal to any
recipient.

Call signature:

```
type SendResult = variant { Ok : text; Err : text };

send_sui : (destination_address : SuiAddress, amount_in_mist : nat64) -> (SendResult);
```

Send Sui by specifying receiver address and amount (in MIST):

```bash
dfx canister call backend send_sui '("0x1234567890abcdef...", 1000000000)'
```

## Contributors

<!-- readme: collaborators,contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/kristoferlund">
                    <img src="https://avatars.githubusercontent.com/u/9698363?v=4" width="100;" alt="kristoferlund"/>
                    <br />
                    <sub><b>Kristofer</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: collaborators,contributors -end -->

## License

This project is licensed under the MIT License. See the LICENSE file for more
details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you
have any suggestions or improvements.

[contributors-shield]: https://img.shields.io/github/contributors/kristoferlund/sui_wallet.svg?style=for-the-badge
[contributors-url]: https://github.com/kristoferlund/sui_wallet/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kristoferlund/sui_wallet.svg?style=for-the-badge
[forks-url]: https://github.com/kristoferlund/sui_wallet/network/members
[stars-shield]: https://img.shields.io/github/stars/kristoferlund/sui_wallet?style=for-the-badge
[stars-url]: https://github.com/kristoferlund/sui_wallet/stargazers
[issues-shield]: https://img.shields.io/github/issues/kristoferlund/sui_wallet.svg?style=for-the-badge
[issues-url]: https://github.com/kristoferlund/sui_wallet/issues
[license-shield]: https://img.shields.io/github/license/kristoferlund/sui_wallet.svg?style=for-the-badge
[license-url]: https://github.com/kristoferlund/sui_wallet/blob/master/LICENSE.txt
