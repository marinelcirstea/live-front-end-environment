import { NextApiRequest, NextApiResponse } from "next";

import { extractProjectEntity } from "lib/project-entity";
import dbConnect from "services/dbConnect";
import Project from "models/project-model";
import { IProjectModel } from "types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const id = req.query.id;

  switch (req.method) {
    case "GET": {
      try {
        const project: IProjectModel = await Project.findOne({ _id: id }).lean();

        if (!project) return res.status(404).end();

        if (!project.isPublic) return res.status(403).end();

        return res.status(200).json(project);
      } catch (error) {
        console.log(error);
        res.status(500).end();
        break;
      }
    }

    case "PUT": {
      try {
        const entity = extractProjectEntity(req.body);

        if (!entity) return res.status(400).end();

        const updated = await Project.updateOne({ _id: id }, { ...entity });

        if (!updated.acknowledged) return res.status(404).end();

        return res.status(200).end();
      } catch (error) {
        console.log(error);
        return res.status(500).end();
      }
    }

    case "DELETE": {
      try {
        const deleted = await Project.deleteOne({ _id: id });

        if (deleted.deletedCount === 0) return res.status(404).end();

        return res.status(200).end();
      } catch (error) {
        console.log(error);
        return res.status(500).end();
      }
    }

    default:
      return res.status(405).end();
  }

  return res.status(500);
}
