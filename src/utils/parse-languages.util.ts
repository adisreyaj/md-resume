import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import find from 'unist-util-find';
import type { VFile } from 'vfile';

export const parseLanguages: Plugin<any[], Root, string> = () => (tree: Root, file: VFile) => {
  const languages = {
    type: 'containerDirective',
    name: 'languages',
  };

  const languagesNode = find(tree, languages);
  if (languagesNode) {
    const { children } = languagesNode;
    const languages = children[0].children.reduce((acc: any, curr: any) => {
      return [...acc, curr.children[0].children[0].value];
    }, []);
    const data = file.data;
    data.languages = languages;
  }
};
