import debounce from 'just-debounce';
import Split from 'split.js';
import { SAMPLE_RESUME } from './data/sample';
import './main.scss';
import { getFullHTML } from './templates/resume-download.template';
import { downloadToFile } from './utils/download.util';
import { initEditor } from './utils/editor.util';
import { appendStylesToDocument, fetchStylesForSelectedTheme } from './utils/style.util';
import Worker from './workers/markdown.worker?worker';

// Declarations
let selectedThemeStyles: string | null = null;
const worker = new Worker();
const markdownInput = document.getElementById('markdown') as HTMLTextAreaElement;
const print = document.querySelector('.rendered__print');
const download = document.querySelector('.rendered__download');
const rendered = document.getElementById('rendered') as HTMLDivElement;

const updateRendered = ({ data }: { data: string }) => (rendered.innerHTML = data);
const openPrintDialog = () => window.print();
const downloadHTML = () => {
  const resumeHTML = document.querySelector('#rendered');
  if (resumeHTML && selectedThemeStyles) {
    const fullHTML = getFullHTML(resumeHTML.innerHTML, selectedThemeStyles);
    downloadToFile('resume.html', fullHTML);
  }
};

// Initializations
Split(['.app__markdown', '.app__rendered']);
initEditor(markdownInput, debouncedRender, SAMPLE_RESUME);
render(SAMPLE_RESUME);
fetchStylesForSelectedTheme('default').then((css) => {
  selectedThemeStyles = css;
  appendStylesToDocument(css);
});

// Listeners
worker?.addEventListener('message', updateRendered);
print?.addEventListener('click', openPrintDialog);
download?.addEventListener('click', downloadHTML);

// Cleanup
window.addEventListener('beforeunload', () => {
  worker.removeEventListener('message', updateRendered);
  print?.removeEventListener('click', openPrintDialog);
  download?.removeEventListener('click', downloadHTML);
});

function debouncedRender(markdown: string) {
  return debounce(render, 300, false, true)(markdown);
}

function render(markdown: string) {
  worker.postMessage({ markdown });
}
