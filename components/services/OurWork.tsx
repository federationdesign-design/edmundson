import { LOCAL_WORK_PHOTOS } from "../../lib/workPhotos";
import section from "../Section.module.css";
import { WorkGrid } from "../WorkGrid";
import styles from "./OurWork.module.css";

export function OurWork() {
  return (
    <section
      className={`${styles.work} ${section.textured}`}
      aria-labelledby="our-work-title"
    >
      <div className={styles.inner}>
        <h2 id="our-work-title" className={styles.title}>
          Our <span className={styles.accent}>Work</span>
        </h2>
        <p className={styles.intro}>
          A selection of recent projects and installations carried out by our team.
        </p>
        {/* Static on this page; the Our Work page is fed from Google Drive. */}
        <WorkGrid photos={LOCAL_WORK_PHOTOS} />
      </div>
    </section>
  );
}
