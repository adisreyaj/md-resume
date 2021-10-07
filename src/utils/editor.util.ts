import { basicSetup } from '@codemirror/basic-setup';
import { markdown } from '@codemirror/lang-markdown';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, ViewUpdate } from '@codemirror/view';

export const initEditor = (
  attachTo: HTMLElement,
  onUpdate: (content: string) => void,
  initialValue = ''
): EditorView => {
  return new EditorView({
    state: EditorState.create({
      doc: initialValue,
      extensions: [
        basicSetup,
        markdown({
          addKeymap: true,
        }),
        oneDark,
        EditorView.updateListener.of((v: ViewUpdate) => {
          if (v.docChanged) {
            onUpdate(v.state.doc.toString());
          }
        }),
      ],
    }),
    parent: attachTo,
  });
};
