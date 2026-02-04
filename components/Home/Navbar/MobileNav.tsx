import { NavLinks } from "@/constant/constant";
import Link from "next/link";
import React, { useEffect, useCallback } from "react";
import { CgClose } from "react-icons/cg";
import { usePathname } from "next/navigation";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ showNav, closeNav }: Props) => {
  const pathname = usePathname();

  // zamykaj po zmianie ścieżki (np. klik w Link)
  useEffect(() => {
    if (showNav) closeNav();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ESC zamyka
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && showNav) closeNav();
    },
    [showNav, closeNav]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  // blokada scrolla tła
  useEffect(() => {
    const body = document.body;
    if (showNav) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [showNav]);

  // klasy animacji
  const panel = showNav ? "translate-x-0" : "translate-x-full";
  const overlay =
    showNav ? "opacity-70 pointer-events-auto" : "opacity-0 pointer-events-none";

  return (
    <div aria-hidden={String(!showNav)}>
      {/* overlay (klik = zamknij) */}
      <div
        onClick={closeNav}
        className={`fixed inset-0 transition-opacity duration-300 bg-black ${overlay} z-[100002]`}
      />
      {/* panel */}
      <nav
        className={`fixed right-0 top-0 h-screen w-[80%] sm:w-[60%] z-[100050] bg-orange-400/85 text-white
        transform transition-transform duration-300 ${panel} flex flex-col justify-center space-y-5`}
        role="dialog"
        aria-modal="true"
      >
        {/* linki – klik = zamknij */}
        <ul className="flex flex-col gap-4">
          {NavLinks.map((link) => (
            <li key={link.id} className="ml-12">
              <Link
                href={link.url}
                onClick={closeNav}
                className="text-white text-xl border-b-[1.5px] pb-1 border-white sm:text-[30px]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* close icon */}
        <button
          aria-label="Zamknij menu"
          onClick={closeNav}
          className="absolute top-3 right-4"
        >
          <CgClose className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </nav>
    </div>
  );
};

export default MobileNav;
