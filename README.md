# Figma Dividers

A tiny no-UI Figma plugin that syncs divider layers inside a selected frame.

## Behavior

1. Select one frame.
2. The selected frame must include at least one direct child frame named `Divider`.
3. Run the plugin.

The plugin treats every direct child that is not a frame named `Divider` as content. For `n` content children, it keeps exactly `n - 1` dividers, removes extra dividers from the end, duplicates the first `Divider` frame when more are needed, and reorders the children so each content sibling has a divider between it and the next content sibling.

## Development

Install dependencies:

```sh
npm install
```

Build `code.ts` into the `code.js` file used by Figma:

```sh
npm run build
```

Lint the source:

```sh
npm run lint
```
