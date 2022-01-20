import NavLink from "components/nav-link";
import s from "./style.module.css";

const Project = ({ id, name, iframeUrl }) => {
  return (
    <article className={s.project} key={id}>
      <div className={s.previewContainer} id={id}>
        <div className={s.previewIframe}>
          <iframe scrolling="no" src={iframeUrl} className={s.preview}></iframe>
        </div>
      </div>
      <div className={s.footer}>
        <p className={s.name}>{name}</p>
        <div className={s.projectActions}>
          <NavLink href={`/projects/${id}`}>Edit</NavLink>
        </div>
      </div>
    </article>
  );
};

export const PList = ({ children, ...props }) => {
  return (
    <div className={s.widthWrapper}>
      <div className={s.pageTitle}>
        <h1>Public Projects</h1>{" "}
        <NavLink href="/projects/new" className={s.create}>
          Create
        </NavLink>{" "}
      </div>
      <div {...props} className={s.projects}>
        {children}
      </div>
    </div>
  );
};

export default Project;
