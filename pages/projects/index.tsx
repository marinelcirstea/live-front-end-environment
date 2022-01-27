import { getGeneratedPageURL } from "lib/blob";
import { useEffect, useState } from "react";
import Project, { PList } from "components/p";
import Loading from "components/loading";
import { useToast } from "contexts/toast-context";
import { IProjectModel } from "types";

function AllProjectsPage() {
  const [projects, setProjects] = useState<IProjectModel[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) {
        toast.error("Something went wrong. Please refresh the page.");
      }
      const data = await res.json();
      setProjects(data);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <Loading />}
      <PList>
        {projects[0] &&
          projects.map((project) => {
            const { _id, name, html, css, javascript } = project;
            const url = getGeneratedPageURL({ html, css, javascript });
            return <Project key={_id} id={_id} name={name} iframeUrl={url} />;
          })}
      </PList>
    </>
  );
}

export default AllProjectsPage;
