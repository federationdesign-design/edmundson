import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  ClipboardCheckIcon,
  ClockIcon,
  CogIcon,
  DoorIcon,
  HardHatIcon,
  LinkIcon,
  VehicleRampIcon,
  WrenchIcon,
} from "../icons";
import { SERVICES } from "../../lib/services";
import section from "../Section.module.css";
import styles from "./Services.module.css";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const ICONS: Record<(typeof SERVICES)[number]["title"], Icon> = {
  "Inspections & load tests": ClipboardCheckIcon,
  "Supply of lifting & safety equipment": LinkIcon,
  Repairs: WrenchIcon,
  Fabrication: CogIcon,
  "On-site maintenance": HardHatIcon,
  "Partition doors": DoorIcon,
  "Vehicle ramps & tail lifts": VehicleRampIcon,
  "24 hour assistance": ClockIcon,
};

export function Services() {
  return (
    <section
      className={`${styles.services} ${section.textured}`}
      aria-labelledby="services-title"
    >
      <div className={styles.inner}>
        <h2 id="services-title" className={styles.title}>
          Our <span className={styles.accent}>Services</span>
        </h2>
        <ul className={styles.grid} role="list">
          {SERVICES.map(({ title, description }) => {
            const Icon = ICONS[title];
            return (
              <li key={title} className={styles.item}>
                <Link href="/services" className={styles.link}>
                  <span className={styles.tile}>
                    <Icon className={styles.icon} />
                  </span>
                  <h3 className={styles.itemTitle}>{title}</h3>
                  <p className={styles.description}>{description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
