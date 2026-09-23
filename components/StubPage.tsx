import styles from "./StubPage.module.css";

// PLACEHOLDER: route stub so nav and footer links resolve. Content to be
// briefed separately (see PLACEHOLDERS.md).
export function StubPage({ title }: { title: string }) {
  return (
    <div className={styles.stub} data-placeholder="page-content">
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
