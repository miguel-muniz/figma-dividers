const DIVIDER_NAME = 'Divider';

function isDividerNode(node: SceneNode): node is FrameNode {
  return node.type === 'FRAME' && node.name === DIVIDER_NAME;
}

function closeWithMessage(message: string): void {
  figma.notify(message);
  figma.closePlugin();
}

function getSelectedFrame(): FrameNode | null {
  const selection = figma.currentPage.selection;

  if (selection.length !== 1) {
    closeWithMessage('Select one frame that contains a child frame named "Divider".');
    return null;
  }

  const selectedNode = selection[0];

  if (selectedNode.type !== 'FRAME') {
    closeWithMessage('Select a frame that contains a child frame named "Divider".');
    return null;
  }

  return selectedNode;
}

function ensureDividersBetweenChildren(frame: FrameNode): void {
  const initialChildren = [...frame.children];
  const contentNodes = initialChildren.filter((child) => !isDividerNode(child));
  const dividerNodes = initialChildren.filter(isDividerNode);

  if (dividerNodes.length === 0) {
    closeWithMessage('Add a direct child frame named "Divider" to use as the divider template.');
    return;
  }

  const targetDividerCount = Math.max(contentNodes.length - 1, 0);
  const dividerTemplate = dividerNodes[0];
  const dividersToUse = dividerNodes.slice(0, targetDividerCount);
  const extraDividers = dividerNodes.slice(targetDividerCount);
  const removedDividerCount = extraDividers.length;
  let addedDividerCount = 0;

  for (const divider of [...extraDividers].reverse()) {
    divider.remove();
  }

  while (dividersToUse.length < targetDividerCount) {
    const divider = dividerTemplate.clone();
    divider.name = DIVIDER_NAME;
    dividersToUse.push(divider);
    addedDividerCount += 1;
  }

  const orderedChildren: SceneNode[] = [];

  for (let index = 0; index < contentNodes.length; index += 1) {
    orderedChildren.push(contentNodes[index]);

    if (index < contentNodes.length - 1) {
      orderedChildren.push(dividersToUse[index]);
    }
  }

  for (let index = 0; index < orderedChildren.length; index += 1) {
    frame.insertChild(index, orderedChildren[index]);
  }

  figma.currentPage.selection = [frame];

  const detailParts = [
    addedDividerCount > 0 ? `${addedDividerCount} added` : null,
    removedDividerCount > 0 ? `${removedDividerCount} removed` : null,
  ].filter((part): part is string => part !== null);

  const detail = detailParts.length > 0 ? ` (${detailParts.join(', ')})` : '';
  closeWithMessage(`Dividers updated${detail}.`);
}

const selectedFrame = getSelectedFrame();

if (selectedFrame !== null) {
  ensureDividersBetweenChildren(selectedFrame);
}
