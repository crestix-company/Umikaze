// Keep root hosting and GitHub project Pages compatible with the same source.
export const siteBasePath = process.env.SITE_BASE_PATH || '/';
if (!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(siteBasePath)) {
  throw new Error('SITE_BASE_PATH must be a slash-delimited path, e.g. /Umikaze/.');
}

export function localTarget(path, currentFile) {
  if (!path) return currentFile;
  if (path === siteBasePath) return 'index.html';
  if (path.startsWith('/')) {
    if (!path.startsWith(siteBasePath)) throw new Error(`Link outside site: ${path}`);
    return path.slice(siteBasePath.length);
  }
  return path;
}
