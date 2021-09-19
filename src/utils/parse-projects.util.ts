import { sanitize } from 'hast-util-sanitize';
import { toHtml } from 'hast-util-to-html';
import type { Root } from 'mdast';
import { toHast } from 'mdast-util-to-hast';
import { Plugin } from 'unified';
import find from 'unist-util-find';
import type { VFile } from 'vfile';
import yaml from 'yaml';

export const parseProjects: Plugin<any[], Root, string> =
  () => (tree: Root, file: VFile) => {
    const projects = {
      type: 'containerDirective',
      name: 'projects',
    };

    const projectsNode = find(tree, projects);
    if (projectsNode) {
      const { children: projectsItems } = projectsNode;
      const data = file.data;
      const projectEntries: any[] = [];
      let projectItem = 0;
      projectsItems.forEach((item: any) => {
        if (item.type === 'group') {
          const meta = yaml.parse(item.value);
          projectEntries.push({ ...meta, data: [] });
          projectItem++;
        } else {
          const hast = toHast(item);
          if (hast) {
            const html = toHtml(sanitize(hast));
            projectEntries[projectItem - 1].data.push(html);
          }
        }
      });

      data.projects = projectEntries;
    }
  };
