const autoprefixer = require('autoprefixer');
const tailwind = require('tailwindcss');
const postcss = require('postcss');
const fs = require('fs').promises;
const cssnano = require('cssnano');
const sass = require('sass');
const path = require('path');
const THEMES_DIR = path.join('src/themes');
const PUBLIC_FOLDER = 'public/styles/themes';
const tailwindConf = require('../tailwind.config.js');
const { produce } = require('immer');
(async () => {
  const themes = await fs.readdir(THEMES_DIR);
  const buildAllStyles$ = themes.map((theme) => buildStyles(theme));
  const results = await Promise.all(buildAllStyles$);
  console.log(`Building styles for ${results.length} theme.`);
  if (results.length > 0) {
    await Promise.all(
      results.filter(Boolean).map((result) => writeToFile(result))
    );
  }
})();

async function buildStyles(theme) {
  const THEME_STYLES_PATH = path.join(THEMES_DIR, theme, 'styles.scss');
  const tailwindConfigForSelectedTheme = produce(tailwindConf, (draft) => {
    draft.purge = [`./src/themes/${theme}/*.{scss,tsx}`];
  });
  const file = await fs.readFile(THEME_STYLES_PATH);
  if (file) {
    const result = sass.renderSync({
      data: file.toString(),
      sourceMap: false,
    });
    const compiledCSS = result.css.toString();
    const processedCSS = await postcss([
      tailwind(tailwindConfigForSelectedTheme),
      autoprefixer,
      cssnano({ preset: 'default' }),
    ])
      .process(compiledCSS)
      .then((result) => result.css);
    return { name: theme, css: processedCSS };
  }
  return null;
}

async function writeToFile({ css, name }) {
  console.log(`Writing styles for ${name}`);
  const FOLDER_TO_WRITE = path.join(PUBLIC_FOLDER, name);
  try {
    const folderExists = await fs.readdir(FOLDER_TO_WRITE);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      await fs.mkdir(FOLDER_TO_WRITE);
    }
  }
  try {
    await fs.writeFile(`${FOLDER_TO_WRITE}/styles.css`, css);
  } catch (error) {
    console.log(error);
    return null;
  }
}
