import { sanitize } from 'hast-util-sanitize';
import { toHtml } from 'hast-util-to-html';
import type { Root } from 'mdast';
import { toHast } from 'mdast-util-to-hast';
import { Plugin } from 'unified';
import find from 'unist-util-find';
import type { VFile } from 'vfile';
import yaml from 'yaml';

export const parseWork: Plugin<any[], Root, string> = () => (tree: Root, file: VFile) => {
  const work = {
    type: 'containerDirective',
    name: 'work',
  };

  const workNode: Root = find(tree, work);
  if (workNode) {
    const { children: workItems } = workNode;
    const data = file.data;
    const educationEntries: any[] = [];
    let educationItem = 0;
    workItems.forEach((item: any) => {
      if (item.type === 'group') {
        const meta = yaml.parse(item.value);
        educationEntries.push({ ...meta, data: [] });
        educationItem++;
      } else {
        const hast = toHast(item);
        if (hast) {
          const html = toHtml(sanitize(hast));
          educationEntries[educationItem - 1].data.push(html);
        }
      }
    });
    data.work = educationEntries;
  }
};
