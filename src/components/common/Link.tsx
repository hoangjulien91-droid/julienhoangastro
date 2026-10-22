import React from "react";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function Link({ href, children, className, ...props }: LinkProps) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}

export default Link;
