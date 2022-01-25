export function extractProjectEntity({ author, name, html, css, javascript, isPublic }: IProject) {
  const pieces: IProject = { author, name, html, css, javascript, isPublic };

  if (typeof name !== "string") delete pieces.name;
  if (typeof html !== "string") delete pieces.html;
  if (typeof css !== "string") delete pieces.css;
  if (typeof javascript !== "string") delete pieces.javascript;

  if (typeof isPublic !== "boolean") delete pieces.isPublic;

  if (Object.keys(pieces).length === 0) return undefined;

  return pieces;
}
