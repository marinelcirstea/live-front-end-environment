/**
 * @type Model: Mongoose Model or Object Interface
 */
export type KeysOfModel<Model> = { [key in keyof Model]?: Model[key] };

export interface IProject {
  name: string;
  html: string;
  css: string;
  javascript: string;
  author: string;
  isPublic: boolean;
}

export interface IProjectModel extends IProject {
  _id: string;
}
