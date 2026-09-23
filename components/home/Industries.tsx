import { CartIcon, FactoryIcon, PlusIcon, TruckIcon, UtensilsIcon } from "../icons";
import styles from "./Industries.module.css";

const INDUSTRIES = [
  { label: "Supermarket", Icon: CartIcon },
  { label: "Hospitality", Icon: UtensilsIcon },
  { label: "Engineering", Icon: FactoryIcon },
  { label: "Transport", Icon: TruckIcon },
  { label: "and many more", Icon: PlusIcon },
];

export function Industries() {
  return (
    <section className={styles.industries} aria-labelledby="industries-title">
      <div className={styles.inner}>
        <h2 id="industries-title" className={styles.title}>
          Industries <span className={styles.accent}>we serve</span>
        </h2>
        <ul className={styles.grid} role="list">
          {INDUSTRIES.map(({ label, Icon }) => (
            <li key={label} className={styles.item}>
              <Icon className={styles.icon} />
              <span className={styles.label}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
