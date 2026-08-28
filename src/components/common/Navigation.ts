export function useRouter() {
  return {
    push: (url: string) => {
      if (typeof window !== "undefined") {
        window.location.href = url;
      }
    },
    replace: (url: string) => {
      if (typeof window !== "undefined") {
        window.location.replace(url);
      }
    },
    back: () => {
      if (typeof window !== "undefined") {
        window.history.back();
      }
    },
    pathname: typeof window !== "undefined" ? window.location.pathname : "",
  };
}

export function usePathname() {
  return typeof window !== "undefined" ? window.location.pathname : "";
}

export function useSearchParams() {
  return typeof window !== "undefined"
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams();
}
