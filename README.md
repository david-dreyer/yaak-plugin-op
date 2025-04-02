# 1Password CLI Plugin for Yaak API Client

This is a port of [1Password CLI Plugin for Insomnia](https://github.com/benvp/insomnia-plugin-op)

## Getting started

* Install the [1Password CLI](https://developer.1password.com/docs/cli/).
* Clone this repo locally or download latest Release archive
* Modify the `config.json` file in the `build` directory as appropriate (see: [Config](#Config))
* Install the plugin
  * Yaak > Settings > Plugins
  * Click 'Select Plugin', and open the location of the cloned repository

## Configuration Options

### cliPath

* If you install the 1Password CLI via a package manager (like [Homebrew](https://brew.sh/)), then you may need to tell the plugin the path to the CLI.

### defaultAccount

* The URL for the default account that the plugin should search in.

### cacheTTL

* Passwords are kept in memory in the plugin for 3600 seconds (1 hour) by default.
* To access passwords that are added to 1Password before the TTL expires you'll need to restart Yaak.
* Use 0 for infinite caching. This will require a restart of Yaak to refresh credentials.

### flags

* Any additional flags which should be passed to the 1Password CLI
  * For available flags, see https://developer.1password.com/docs/cli/reference/#global-flags

Example:
```json
{
  "flags": {
    "cache": false
  }
}
```

## Usage

1. Type `1Password` in any field you wish to perform a lookup. Press `Return` to autocomplete the function call.
2. Click on the inserted `1Password(...)` function.
3. Paste a reference to a 1Password item in `Reference`.
   4. Hint: within the 1Password UI, click the dropdown arrow next to the field of interest, and select "Copy Secret Reference"
5. Optionally override the `Account` value. If omitted, it will use the configured `defaultAccount` value
6. 1Password may ask to be unlocked, and the Preview should populate. Click Done.
