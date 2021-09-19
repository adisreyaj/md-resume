import type { Root } from 'mdast';
import { Link, List, Paragraph, Text } from 'mdast-util-from-markdown/lib';
import type { Plugin } from 'unified';
import find from 'unist-util-find';
import type { VFile } from 'vfile';

export const parseSocials: Plugin<any[], Root, string> =
  () => (tree: Root, file: VFile) => {
    const socials = {
      type: 'containerDirective',
      name: 'socials',
    };
    
    const socialsNode = find(tree, socials);
    if (socialsNode) {
      const data = file.data;
      const { children } = socialsNode;
      const list: List = children.find((item: any) => item?.type === 'list');
      if (list) {
        const listItems = list.children;
        const socialLinks = listItems.reduce((acc: any, curr) => {
          return [
            ...acc,
            {
              name: (
                ((curr.children[0] as Paragraph).children[0] as Link)
                  .children[0] as Text
              ).value,
              link: ((curr.children[0] as Paragraph).children[0] as Link).url,
            },
          ];
        }, []);
        data.socials = socialLinks;
      }
    }
  };
