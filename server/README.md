# Server

## Installation

Before the application can be started it has to be build using yarn.

```bash
yarn # install node dependencies
yarn build # build project
```

Now the application can be started

```bash
yarn start
```

### Configuration

The application can be configured via several environment variables

| Key  | Default | Description                                 |
| ---- | ------- | ------------------------------------------- |
| HOST | 0.0.0.0 | Binds the http server to the given hostname |
| PORT | 3100    | Http server listens on the given port       |
