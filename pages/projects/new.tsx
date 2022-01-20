import EditorComponent from "components/editor";
import { useAuth } from "contexts/auth-context";
import { useToast } from "contexts/toast-context";
import captain from "lib/captain";
import { editorDefaultFileValues } from "lib/editor/default-file-values";
import router from "next/router";
import { IProject } from "types";

function NewProjectPage() {
  const { user } = useAuth();
  const toast = useToast();

  const handleSave = async (filesData: IProject) => {
    if (!user) {
      // TODO: show login modal
      return toast.error("You must be logged in to save a project");
    }

    // if the user isn't the author of the project
    // create a new project with the user's changes
    // and redirect him there

    const { data, ok } = await captain.post(`/api/projects`, {
      ...filesData,
      author: user.uid,
      isPublic: true,
    });

    if (!ok) return toast.error("Failed to save project");

    return router.push(`/projects/${data._id}`);
  };

  return <EditorComponent data={editorDefaultFileValues} onSave={handleSave} />;
}

export default NewProjectPage;
