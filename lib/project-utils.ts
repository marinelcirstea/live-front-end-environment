import { IProjectModel } from "types";
import captain from "./captain";

export const getProject = async (id: string): Promise<{ data: IProjectModel; ok: boolean }> => {
  if (!id) throw new Error(`getProject expects an id`);

  const { data, ok } = await captain.get(`/api/projects/${id}`);

  return { data, ok };
};
