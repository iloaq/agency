"use client";

import type { ReactNode } from "react";

export function AuditScrollLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#audit-form"
      className={className}
      onClick={(event) => {
        event.preventDefault();

        const target = document.getElementById("audit-form");
        if (!target) return;

        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}#audit-form`,
        );
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </a>
  );
}
