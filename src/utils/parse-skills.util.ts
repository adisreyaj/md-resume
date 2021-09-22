import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import find from 'unist-util-find';
import type { VFile } from 'vfile';

export const parseSkills: Plugin<any[], Root, string> =
  () => (tree: Root, file: VFile) => {
    const skills = {
      type: 'containerDirective',
      name: 'skills',
    };
    const skillsNode = find(tree, skills);
    if (skillsNode) {
      const { children } = skillsNode;
      const skills = children[0].children.reduce((acc: any, curr: any) => {
        const skillValue = curr.children[0].children[0].value;
        if (skillValue) {
          const [skill, proficiency] = skillValue.split('::');
          return [...acc, { skill, proficiency }];
        }
        return acc;
      }, []);
      const data = file.data;
      data.skills = skills;
    }
  };
