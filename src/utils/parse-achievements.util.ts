import { sanitize } from 'hast-util-sanitize';
import { toHtml } from 'hast-util-to-html';
import type { Root } from 'mdast';
import { toHast } from 'mdast-util-to-hast';
import type { Plugin } from 'unified';
import find from 'unist-util-find';
import type { VFile } from 'vfile';
export const parseAchievements: Plugin<any[], Root, string> =
  () => (tree: Root, file: VFile) => {
    const achievements = {
      type: 'containerDirective',
      name: 'achievements',
    };

    const achievementsNode: Root = find(tree, achievements);
    if (achievementsNode) {
      const { children } = achievementsNode;
      const achievementsEntries: any[] = [];
      let achievementsItem = 0;
      children.forEach((item: any) => {
        if (item.type === 'heading' && item.depth === 1) {
          achievementsEntries.push({ title: item.children[0].value, data: [] });
          achievementsItem++;
        } else {
          const hast = toHast(item);
          if (hast) {
            const html = toHtml(sanitize(hast));
            achievementsEntries[achievementsItem - 1].data.push(html);
          }
        }
      });
      const data = file.data;
      data.achievements = achievementsEntries;
    }
  };
