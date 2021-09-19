import { basicSetup, EditorState } from '@codemirror/basic-setup';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, ViewUpdate } from '@codemirror/view';
import debounce from 'just-debounce';
import Split from 'split.js';
import './main.scss';
import Worker from './workers/markdown.worker?worker';

const worker = new Worker();
const markdownInput = document.getElementById(
  'markdown'
) as HTMLTextAreaElement;
Split(['.app__markdown', '.app__rendered']);
initEditor(markdownInput);
const rendered = document.getElementById('rendered') as HTMLDivElement;
worker?.addEventListener('message', ({ data }) => {
  rendered.innerHTML = data;
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
