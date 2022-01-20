const getBlobURL = (code: string, type: string) => {
  const blob = new Blob([code], { type });
  return URL.createObjectURL(blob);
};

export interface IgetGeneratedPageURL {
  html: string;
  css: string;
  javascript: string;
}

export const getGeneratedPageURL = ({ html, css, javascript }: IgetGeneratedPageURL) => {
  const cssURL = getBlobURL(css, "text/css");
  const javascriptURL = getBlobURL(javascript, "text/javascript");

  const source = `
      <html>
        <head>
          ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
          </head>
          <body>
          ${html || ""}
          ${javascript && `<script src="${javascriptURL}"></script>`}
        </body>
      </html>
    `;

  return getBlobURL(source, "text/html");
};
