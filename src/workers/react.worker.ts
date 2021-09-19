import ReactDOMServer from 'react-dom/server';
import { Main } from '../themes/default/Index';
addEventListener('message', ({}) => {
  if (Main) {
    const parsed = ReactDOMServer.renderToStaticMarkup(
      Main({ data: null }) as any
    );
    postMessage(parsed);
  }
});
