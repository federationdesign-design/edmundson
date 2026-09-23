import Image from "next/image";
import styles from "./Qualifications.module.css";

type Qualification = {
  name: string;
  caption: string;
  /** Supplied logo file, or null to render a neutral placeholder tile. */
  logo: { src: string } | null;
};

const LOGO_DIR = "/images/accreditations";

const QUALIFICATIONS: Qualification[] = [
  {
    name: "CABWI",
    caption: "Level 2 in confined spaces",
    logo: { src: `${LOGO_DIR}/CABWI-01-1400x528.jpg` },
  },
  {
    name: "PASMA",
    caption: "Tower training",
    logo: { src: `${LOGO_DIR}/PASMA-logo.png` },
  },
  {
    name: "IPAF",
    caption: "Operators",
    logo: { src: `${LOGO_DIR}/IPAF.png` },
  },
  {
    name: "IPAF",
    caption: "Harness inspectors",
    logo: { src: `${LOGO_DIR}/IPAF.png` },
  },
  {
    name: "SSIP",
    caption: "Approved",
    logo: { src: `${LOGO_DIR}/ssiplogo.png` },
  },
  {
    name: "LOLER",
    caption: "Trained",
    logo: { src: `${LOGO_DIR}/LOLER-1024x321.png` },
  },
  {
    name: "LEEA",
    caption: "Full members of LEEA",
    logo: { src: `${LOGO_DIR}/leea.png` },
  },
];

export function Qualifications() {
  return (
    <section className={styles.qualifications} aria-labelledby="qualifications-title">
      <div className={styles.inner}>
        <h2 id="qualifications-title" className={styles.title}>
          Our <span className={styles.accent}>Qualifications &amp; Approvals</span>
        </h2>
      </div>
      {/* Scrolls horizontally on narrow screens rather than squashing logos. */}
      <div
        className={styles.scroller}
        role="region"
        aria-label="Qualifications and approvals"
        tabIndex={0}
      >
        <ul className={styles.list} role="list">
          {QUALIFICATIONS.map(({ name, caption, logo }) => (
            <li key={`${name}-${caption}`} className={styles.item}>
              <div className={styles.tile}>
                {logo ? (
                  <Image
                    src={logo.src}
                    alt={`${name} logo`}
                    fill
                    sizes="(min-width: 64em) 12vw, 9rem"
                    className={styles.logo}
                  />
                ) : (
                  <span
                    className={styles.placeholder}
                    data-placeholder="accreditation-logo"
                  >
                    {name}
                  </span>
                )}
              </div>
              <p className={styles.caption}>
                <strong className={styles.name}>{name}</strong>
                <span>{caption}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
