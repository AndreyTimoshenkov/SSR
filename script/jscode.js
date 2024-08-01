import { fullReplaceDocument } from './wrappers/documentWrapper';
import { fullReplaceLocalStorage } from './wrappers/localStorageWrapper';
import { fullWindowReplace } from './wrappers/windowWrapper'

export default function transform(file, api) {
  const jscode = api.jscodeshift;
  const root = jscode(file.source);

  fullReplaceDocument(root, jscode);
  fullReplaceLocalStorage(root, jscode);
  fullWindowReplace(root, jscode);

  return root.toSource(root);
}

