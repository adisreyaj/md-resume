import ReactDOMServer from 'react-dom/server';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { ResumeData } from '../interfaces/resume-data.interface';
import { parseAchievements } from '../parsers/achievements.parser';
import { parseEducation } from '../parsers/education.parser';
import { parseLanguages } from '../parsers/languages.parser';
import { parseMeta } from '../parsers/metadata.parser';
import { parseProjects } from '../parsers/projects.parser';
import { parseSkills } from '../parsers/skills.parser';
import { parseSocials } from '../parsers/socials.parser';
import { parseWork } from '../parsers/work.parser';
import { Main } from '../themes/default/Index';

addEventListener('message', async ({ data }) => {
  const tree = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkFrontmatter, {
      type: 'group',
      fence: '---',
      anywhere: true,
    })
    .use(remarkStringify)
    .use(parseLanguages)
    .use(parseSkills)
    .use(parseEducation)
    .use(parseWork)
    .use(parseProjects)
    .use(parseAchievements)
    .use(parseSocials)
    .use(parseMeta)
    .process(data.markdown);

  const parsed = tree.data as any as ResumeData;
  const renderedString = ReactDOMServer.renderToStaticMarkup(Main({ data: parsed }) as any);
  postMessage(renderedString);
});
