import type { ReactNode } from "react";
import { CheckIcon } from "../icons";
import section from "../Section.module.css";
import { Pennant } from "./Pennant";
import styles from "./ServiceChecklist.module.css";

const LEFT: ReactNode[] = [
  <>
    <strong>Lifting equipment</strong> inspections and load tests, in house or on site,
    across England, Scotland and Wales.
  </>,
  <>
    <strong>Supply</strong> of loose lifting and safety equipment.
  </>,
  <>
    <strong>Repairs</strong> of lifting and safety equipment.
  </>,
  <>
    <strong>Fabrication</strong> work for runways, swing arms and lifting apparatus, all
    installed by our team.
  </>,
  <>General on-site maintenance work to ensure site safety.</>,
];

const RIGHT: ReactNode[] = [
  <>Inspection of partition doors.</>,
  <>Inspection and repairs on vehicle ramps, scissor tables and tail lifts.</>,
  <>
    <strong>24 hour</strong> assistance.
  </>,
  <>CABWI Level 2 in confined spaces.</>,
  <>PASMA tower qualifications.</>,
  <>IPAF operators.</>,
  <>IPAF harness inspectors.</>,
  <>SSIP approved.</>,
  <>LOLER trained.</>,
  <>Full members of LEEA.</>,
];

function Checklist({ items }: { items: ReactNode[] }) {
  return (
    <ul className={styles.list} role="list">
      {items.map((item, i) => (
        <li key={i} className={styles.item}>
          <CheckIcon className={styles.tick} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ServiceChecklist() {
  return (
    <section className={styles.checklist} aria-labelledby="our-services-title">
      <div className={styles.inner}>
        <h2 id="our-services-title" className={styles.title}>
          Our <span className={section.highlight}>Services</span>
        </h2>
        <div className={styles.layout}>
          <div className={styles.columns}>
            <Checklist items={LEFT} />
            <Checklist items={RIGHT} />
          </div>
          <Pennant />
        </div>
      </div>
    </section>
  );
}
