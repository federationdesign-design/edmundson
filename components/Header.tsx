"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { EMAIL, EMAIL_HREF, NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "../lib/site";
import { CloseIcon, MailIcon, MenuIcon, PhoneIcon } from "./icons";
import { Logo } from "./Logo";
import section from "./Section.module.css";
import styles from "./Header.module.css";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLinks({
  pathname,
  className,
  onNavigate,
}: {
  pathname: string;
  className: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className={className} role="list">
      {NAV_LINKS.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className={styles.navLink}
            aria-current={isActive(pathname, href) ? "page" : undefined}
            onClick={onNavigate}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ContactLinks({ className }: { className: string }) {
  return (
    <ul className={className} role="list">
      <li>
        <a href={PHONE_HREF} className={styles.contactLink}>
          <PhoneIcon className={styles.contactIcon} />
          {PHONE_DISPLAY}
        </a>
      </li>
      <li>
        <a href={EMAIL_HREF} className={`${styles.contactLink} ${styles.email}`}>
          <MailIcon className={styles.contactIcon} />
          {EMAIL}
        </a>
      </li>
    </ul>
  );
}

function MobileControls({
  menuId,
  open,
  onOpen,
}: {
  menuId: string;
  open: boolean;
  onOpen: (trigger: HTMLButtonElement) => void;
}) {
  return (
    <div className={styles.mobileControls}>
      <a href={PHONE_HREF} className={styles.mobilePhone}>
        <PhoneIcon className={styles.contactIcon} />
        <span className={styles.mobilePhoneNumber}>{PHONE_DISPLAY}</span>
        <span className={section.visuallyHidden}> (call us)</span>
      </a>
      <button
        type="button"
        className={styles.menuButton}
        aria-controls={menuId}
        aria-expanded={open}
        onClick={(e) => onOpen(e.currentTarget)}
      >
        <MenuIcon className={styles.menuIcon} />
        <span className={section.visuallyHidden}>Menu</span>
      </button>
    </div>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const pathname = usePathname();
  const menuId = useId();
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Show the sticky header once the sentinel under the static header has
  // scrolled out of view above the viewport; hide it again on return.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      setStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const openMenu = useCallback((trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  // Focus trap, Escape to close and page scroll lock while the panel is open.
  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    if (!panel) return;
    const root = document.documentElement;
    root.dataset.menuOpen = "true";
    panel.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      delete root.dataset.menuOpen;
    };
  }, [menuOpen, closeMenu]);

  // Close the panel if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 56.25em)");
    const onChange = () => query.matches && setMenuOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Logo />
          <nav className={styles.nav} aria-label="Main">
            <NavLinks pathname={pathname} className={styles.navList} />
          </nav>
          <ContactLinks className={styles.contact} />
          <MobileControls menuId={menuId} open={menuOpen} onOpen={openMenu} />
        </div>
      </header>

      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />

      <div
        className={styles.sticky}
        data-visible={stuck}
        aria-hidden={!stuck}
        inert={!stuck}
      >
        <div className={`${styles.inner} ${styles.stickyInner}`}>
          <Logo compact />
          <nav className={styles.nav} aria-label="Main, compact">
            <NavLinks pathname={pathname} className={styles.navList} />
          </nav>
          <ContactLinks className={`${styles.contact} ${styles.stickyContact}`} />
          <MobileControls menuId={menuId} open={menuOpen} onOpen={openMenu} />
        </div>
      </div>

      <div
        ref={panelRef}
        id={menuId}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!menuOpen}
      >
        <div className={`${styles.inner} ${styles.panelBar}`}>
          <Logo compact />
          <button type="button" className={styles.menuButton} onClick={() => closeMenu()}>
            <CloseIcon className={styles.menuIcon} />
            <span className={section.visuallyHidden}>Close menu</span>
          </button>
        </div>
        <nav className={styles.panelNav} aria-label="Main, mobile">
          <NavLinks
            pathname={pathname}
            className={styles.panelList}
            onNavigate={() => closeMenu(false)}
          />
          <ContactLinks className={styles.panelContact} />
        </nav>
      </div>
    </>
  );
}
