import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import find from 'unist-util-find';
import type { VFile } from 'vfile';
import yaml from 'yaml';

export const parseMeta: Plugin<any[], Root, string> =
  () => (tree: Root, file: VFile) => {
    const meta = find(tree, { type: 'group' });
    if (meta) {
      const data = file.data;
      data.metadata = yaml.parse(meta.value);
    }
  };
