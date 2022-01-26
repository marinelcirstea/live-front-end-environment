import EditorComponent from "components/editor";
import { useEffect, useState } from "react";
import { useToast } from "contexts/toast-context";
import router, { useRouter } from "next/router";
import captain from "lib/captain";
import { useAuth } from "contexts/auth-context";
import { getProject } from "lib/project-utils";
import { useEditor } from "contexts/editor-context";
import { IProjectModel } from "types";

function EditProjectPage() {
  const [project, setProject] = useState<IProjectModel>(null);
  const { id } = useRouter().query;
  const { user } = useAuth();
  const toast = useToast();
  const { setFilesContent } = useEditor();

  useEffect(() => {
    if (!id) return;

    (async () => {
      const { data, ok } = await getProject(`${id}`);
      if (!ok) return toast.error("Failed to get project");

      setProject(data);
    })();
  }, [id]);

  useEffect(() => {
    if (project) {
      const { html, css, javascript } = project;
      setFilesContent({ html, css, javascript });
    }
  }, [project]);

  const handleSave = async (filesData) => {
    if (!user) {
      // TODO: show login modal
      return toast.error("You must be logged in to save a project");
    }

    // if the user isn't the author of the project
    // create a new project with the user's changes
    // and redirect him there
    if (user.uid !== project.author) {
      const { data, ok } = await captain.post(`/api/projects`, filesData);

      if (!ok) return toast.error("Failed to save project");

      return router.push(`/projects/${data._id}`);
    }

    // if the user is the author, save the changes
    const { ok } = await captain.put(`/api/projects/${id}`, filesData);

    if (!ok) return toast.error("Failed to update project");

    return toast.success("Project updated");
  };

  // wait for the project to be fetched
  if (!project) return "Loading..";

  return <EditorComponent onSave={handleSave} />;
}

export default EditProjectPage;
