export const getFullHTML = (content: string, styles: string) => {
  return `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="images/mdr.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <!-- Primary Meta Tags -->
      <title>Simple and Customizable Markdown Resume Generator - MDResume</title>
      <meta name="title" content="Simple and Customizable Markdown Resume Generator - MDResume">
      <meta name="description"
            content="Markdown resume generator helps you keep generate resume pdf or HTML from a markdown file. Update the MD file to generate the latest version of your resume.">

      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://md-resume-kappa.vercel.app/">
      <meta property="og:title" content="Simple and Customizable Markdown Resume Generator - MDResume">
      <meta property="og:description"
            content="Markdown resume generator helps you keep generate resume pdf or HTML from a markdown file. Update the MD file to generate the latest version of your resume.">
      <meta property="og:image" content="https://mdresume.adi.so/images/mdresume.jpg">

      <!-- Twitter -->
      <meta property="twitter:card" content="summary_large_image">
      <meta property="twitter:url" content="https://md-resume-kappa.vercel.app/">
      <meta property="twitter:title" content="Simple and Customizable Markdown Resume Generator - MDResume">
      <meta property="twitter:description"
            content="Markdown resume generator helps you keep generate resume pdf or HTML from a markdown file. Update the MD file to generate the latest version of your resume.">
      <meta property="twitter:image" content="https://mdresume.adi.so/images/mdresume.jpg">
      <style>
      ${styles}
      </style>
    </head>

    <body>
    ${content}
    </body>
</html>
  `;
};
