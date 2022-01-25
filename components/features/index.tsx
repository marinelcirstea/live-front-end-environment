import { SiJavascript } from "react-icons/si";
import NavLink from "components/nav-link";

const Features = () => {
  return (
    <section className="section">
      <div className="features">
        <div className="feature">
          <div className="feature-icon">
            <SiJavascript size={64} />

            <div className="feature-icon-text">
              <h3>Create</h3>
              <p>
                Create components for your application.
                <br />
                <br />
                You can use it to create components for your application.
              </p>

              <NavLink href="/projects/new">Create</NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
