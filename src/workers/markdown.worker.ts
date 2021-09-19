import ReactDOMServer from 'react-dom/server';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { ResumeData } from '../interfaces/resume-data.interface';
import { Main } from '../themes/default/Index';
import { parseAchievements } from '../utils/parse-achievements.util';
import { parseEducation } from '../utils/parse-education.util';
import { parseLanguages } from '../utils/parse-languages.util';
import { parseMeta } from '../utils/parse-metadata.util';
import { parseProjects } from '../utils/parse-projects.util';
import { parseSkills } from '../utils/parse-skills.util';
import { parseSocials } from '../utils/parse-socials.util';
import { parseWork } from '../utils/parse-work.util';

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
  const renderedString = ReactDOMServer.renderToStaticMarkup(
    Main({ data: parsed }) as any
  );
  postMessage(renderedString);
});
