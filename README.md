# Dividers
A tiny, no-UI Figma plugin that organizes dividers between siblings in a selected frame.
<https://www.figma.com/community/plugin/1638707849539508844>

## Details

### Usage
1. Select a frame that has multiple children, with at least one direct child frame named Divider
2. Run the plugin

### Behavior
1. Adds missing dividers by duplicating the first `Divider` frame
2. Deletes extra `Divider` frames from the end
3. Sorts the remaining `Divider` frames, including customized ones, so there is one `Divider` between each sibling

### Limitations
- Only works on one selected frame at a time
- Dividers before the first item and after the last item aren't supported. You can make them on your own, just use a different layer name

### Pricing
- This plugin is and will always be completely free

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
