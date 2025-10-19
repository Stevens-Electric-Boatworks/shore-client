# SIT E-boat Shore Client

## About The Project

This program is the client side of the shore computer application. Clients can connect to this web app through the browser and remotely monitor the functions of the boat.

See [Stevens-Electrical-Boatworks/shore-server](https://github.com/Stevens-Electric-Boatworks/shore-server) for the server side of the shore computer.

### Built With

- Next.js
- Prisma

## Getting Started

This section will help you download, build, and run the program for development purposes.

### Prerequisites

Ensure that `node.js` is installed on your system:

```
node -v
```

If it is not, consider checking out a Node version manager such as [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm). Instructions on how to set up each of them are included in their respective READMEs.

### Installation

1. Clone the repository to your local system:

```
git clone https://github.com/Dakdot/eboat-client.git
```

2. Install dependencies:

```
npm install
```

3. Generate Prisma sources:

```
npx prisma generate
```

### Running & Building

#### Development

The easiest way to get the program running now is simply to run:

```
npm run dev
```

This command uses will automatically restart the server once you make changes to any files which is ideal for development.

#### Production

To build the server for production, run:

```
npm run build
```

To run it, enter the `.next/standalone` directory and run:

```
node server.js
```

### Creating a Docker image

Simply run:

```
docker build .
```

### GitHub Actions

This repository is set up with some automatic GitHub Actions workflows.

- A Docker image will automatically be built upon every commit.

<!-- CONTRIBUTING -->

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Thiago Andrade - [tandrade1@stevens.edu](mailto:tandrade1@stevens.edu)
