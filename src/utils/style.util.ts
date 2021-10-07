export const fetchStylesForSelectedTheme = async (theme: string): Promise<string> => {
  try {
    const css = await fetch(`/styles/themes/${theme}/styles.css`).then((res) => res.text());
    return css;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch styles');
  }
};

export const appendStylesToDocument = (styles: string): void => {
  const style = document.createElement('style');
  style.innerHTML = styles;
  style.setAttribute('type', 'text/css');
  document.head.appendChild(style);
};
