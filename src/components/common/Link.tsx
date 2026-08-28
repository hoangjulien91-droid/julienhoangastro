import React from "react";

export function Link({ href, children, className, ...props }: any) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}

export default Link;
