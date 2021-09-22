import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import find from 'unist-util-find';
import type { VFile } from 'vfile';
import yaml from 'yaml';
export const parseEducation: Plugin<any[], Root, string> = () => (tree: Root, file: VFile) => {
  const education = {
    type: 'containerDirective',
    name: 'education',
  };

  const educationNode = find(tree, education);
  if (educationNode) {
    const { children: educationItems } = educationNode;
    const data = file.data;
    data.education = educationItems.map((item: any) => {
      return yaml.parse(item.value);
    });
  }
};
