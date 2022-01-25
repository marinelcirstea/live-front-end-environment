import { getGeneratedPageURL } from "lib/blob";
import { useEffect, useState } from "react";
import Project, { PList } from "components/p";
import Loading from "components/loading";
import { useToast } from "contexts/toast-context";

function AllComponentsPage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("loading");
  const toast = useToast();
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) {
        // setError("Something went wrong. Please refresh the page.");
        toast.error("Something went wrong. Please refresh the page.");
      }
      const data = await res.json();
      setProjects(data);
      setError("");
    })();
  }, []);

  return (
    <>
      {error === "loading" && <Loading />}
      <p>{error}</p>
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

export default AllComponentsPage;
