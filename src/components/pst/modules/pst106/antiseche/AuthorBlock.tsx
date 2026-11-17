"use client";

interface AuthorBlockProps {
  color: string;
  title: string;
  lines: { b: string; t: string }[];
}

export function AuthorBlock({ color, title, lines }: AuthorBlockProps) {
  return (
    <div className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-xs">
      <div
        className="text-xs font-mono font-bold uppercase tracking-wider mb-2"
        style={{ color }}
      >
        {title}
      </div>
      {lines.map((l, i) => (
        <p
          className="text-xs sm:text-[13px] leading-relaxed mb-1.5 m-0 text-slate-800 dark:text-slate-200 font-medium"
          key={i}
        >
          <b className="text-slate-900 dark:text-slate-100">{l.b} : </b>
          <span dangerouslySetInnerHTML={{ __html: l.t }} />
        </p>
      ))}
    </div>
  );
}
