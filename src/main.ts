import { basicSetup, EditorState } from '@codemirror/basic-setup';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, ViewUpdate } from '@codemirror/view';
import debounce from 'just-debounce';
import Split from 'split.js';
import './main.scss';
import Worker from './workers/markdown.worker?worker';

const worker = new Worker();
const markdownInput = document.getElementById('markdown') as HTMLTextAreaElement;
const print = document.querySelector('.rendered__print');
Split(['.app__markdown', '.app__rendered']);
initEditor(markdownInput);
fetchStylesForSelectedTheme('default').then((css) => {
  const style = document.createElement('style');
  style.innerHTML = css;
  style.setAttribute('type', 'text/css');
  document.head.appendChild(style);
});
const rendered = document.getElementById('rendered') as HTMLDivElement;
worker?.addEventListener('message', ({ data }) => {
  rendered.innerHTML = data;
});

print?.addEventListener('click', () => {
  window.print();
});
function initEditor(attachTo: HTMLElement) {
  return new EditorView({
    state: EditorState.create({
      extensions: [
        basicSetup,
        markdown({
          addKeymap: true,
        }),
        oneDark,
        EditorView.updateListener.of((v: ViewUpdate) => {
          if (v.docChanged) {
            debouncedRender(v.state.doc.toString());
          }
        }),
      ],
    }),
    parent: attachTo,
  });
}

function debouncedRender(markdown: string) {
  return debounce(render, 300, false, true)(markdown);
}

function render(markdown: string) {
  worker.postMessage({ markdown });
}

async function fetchStylesForSelectedTheme(theme: string) {
  try {
    const css = await fetch(`/styles/themes/${theme}/styles.css`).then((res) => res.text());
    return css;
  } catch (error) {
    console.error(error);
    throw new Error('');
  }
}
