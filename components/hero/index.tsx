import NavLink from "components/nav-link";
import s from "./style.module.css";
import { IoLogoJavascript } from "react-icons/io";
import { DiHtml5, DiCss3 } from "react-icons/di";

const Hero = () => {
  return (
    <section className={s.heroSection}>
      <div className={s.hero}>
        <h1 className={s.headline}>Build, test, and discover front-end code</h1>
        <p className={s.heroCopy}>
          Build and deploy a website, show off your work, build test cases to learn and debug, and
          find inspiration.
        </p>

        <div className={s.currentlySupported}>
          <div className={s.elements}>
            <div className={s.element}>
              <DiHtml5 />
              <span>HTML5</span>
            </div>
            <div className={s.element}>
              <DiCss3 />
              <span>CSS3</span>
            </div>
            <div className={s.element}>
              <IoLogoJavascript />
              <span>Javascript</span>
            </div>
          </div>
        </div>

        <div className={s.heroCta}>
          <NavLink href="/components/new">Start coding, it's free</NavLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
