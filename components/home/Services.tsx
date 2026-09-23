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
import styles from "./Services.module.css";

type Service = {
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const SERVICES: Service[] = [
  {
    title: "Inspections & load tests",
    description: "In house or on site, across England, Scotland and Wales.",
    Icon: ClipboardCheckIcon,
  },
  {
    title: "Supply of lifting & safety equipment",
    description: "Quality equipment for a safer workplace.",
    Icon: LinkIcon,
  },
  {
    title: "Repairs",
    description: "Fast, reliable repairs for lifting and safety equipment.",
    Icon: WrenchIcon,
  },
  {
    title: "Fabrication",
    description: "Runways, swing arms and lifting apparatus, all installed by our team.",
    Icon: CogIcon,
  },
  {
    title: "On-site maintenance",
    description: "Keeping your site safe and operational.",
    Icon: HardHatIcon,
  },
  {
    title: "Partition doors",
    description: "Inspection and assessment of partition doors.",
    Icon: DoorIcon,
  },
  {
    title: "Vehicle ramps & tail lifts",
    description:
      "Inspection and repairs on vehicle ramps, scissor tables and tail lifts.",
    Icon: VehicleRampIcon,
  },
  {
    title: "24 hour assistance",
    description: "Always here when you need us.",
    Icon: ClockIcon,
  },
];

export function Services() {
  return (
    <section className={styles.services} aria-labelledby="services-title">
      <div className={styles.inner}>
        <h2 id="services-title" className={styles.title}>
          Our <span className={styles.accent}>Services</span>
        </h2>
        <ul className={styles.grid} role="list">
          {SERVICES.map(({ title, description, Icon }) => (
            <li key={title} className={styles.item}>
              <Link href="/services" className={styles.link}>
                <span className={styles.tile}>
                  <Icon className={styles.icon} />
                </span>
                <h3 className={styles.itemTitle}>{title}</h3>
                <p className={styles.description}>{description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
