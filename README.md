# ChatGPT Connector

## Development

To test the driver, we can use `npm run local:action` and `npm run local:trigger` commands. They accept 2 parameters: `key` and `fields`. Example:

```
npm run local:action sendPrompt '{"apiKey": "YOUR_OPENAI_API_KEY", "prompt":"some prompt"}'
```

The driver will be run as a WebSocket server after deployment, to test it in production setting, run `npm run server`.

## CDS file

See also [CDS file](cds/chatGPT.json) for this connector, this file is read by Grindery Nexus frontend and engine so that they can interact with the connector. You can also check [schema of the file](https://github.com/grindery-io/grindery-nexus-schema-v2/tree/master/connectors) and [other samples](https://github.com/grindery-io/grindery-nexus-schema-v2/tree/master/cds/web2).

## License

MIT
