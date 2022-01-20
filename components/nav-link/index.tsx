import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

export interface INavLinkProps {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
  className?: string;
}

function NavLink({ href, exact, children, className, ...props }: INavLinkProps) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    let np = className?.split(" ");
    np?.push("active");
    let cname = np?.join(" ");
    className = cname || "active";
  }

  return (
    <Link href={href}>
      <a {...props} className={className}>
        {children}
      </a>
    </Link>
  );
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

export default NavLink;
