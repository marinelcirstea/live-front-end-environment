/**
 * @type Model: Mongoose Model or Object Interface
 */
type KeysOfModel<Model> = { [key in keyof Model]?: Model[key] };

interface IProject {
  name: string;
  html: string;
  css: string;
  javascript: string;
  author: string;
  isPublic: boolean;
}

interface IProjectModel extends IProject {
  _id: string;
}
