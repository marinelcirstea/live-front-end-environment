import { extractProjectEntity } from "lib/project-entity";
import dbConnect from "services/dbConnect";
import Project from "models/project-model";

const handler = async (req, res) => {
  await dbConnect();

  switch (req.method) {
    case "GET": {
      try {
        const projects: IProjectModel[] = await Project.find().lean();

        return res.status(200).json(projects);
      } catch (error) {
        console.log(error);
        return res.status(500);
      }
    }

    case "POST": {
      try {
        const entity = extractProjectEntity(req.body);

        const newProject = new Project({ ...entity });
        const projectData: IProjectModel = await newProject.save();

        return res.status(200).json(projectData);
      } catch (error) {
        console.log(error);
        return res.status(500);
      }
    }

    default:
      return res.status(405);
  }
};

export default handler;
