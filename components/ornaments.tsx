export function Lotus({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 80 40" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.15">
    <path d="M40 32C22 23 29 12 40 4c11 8 18 19 0 28Zm0 0C18 32 11 22 13 12c13 1 24 9 27 20Zm0 0c22 0 29-10 27-20-13 1-24 9-27 20Zm0 0C23 40 8 35 3 24c10-2 19 1 24 4m13 4c17 8 32 3 37-8-10-2-19 1-24 4"/>
    <path d="M40 33V13m-18 7 11 9m25-9-11 9"/><circle cx="40" cy="37" r="1.2" fill="currentColor"/>
  </svg>;
}
export function Flourish() {
  return <div className="flourish" aria-hidden="true"><span/><Lotus/><span/></div>;
}

export function Motif({ kind, animated = true }: { kind: string; animated?: boolean }) {
  return (
    <svg className="motif" data-motif={animated ? kind : undefined} aria-hidden="true" viewBox="0 0 120 120" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="60" cy="60" r="53" strokeDasharray="1 5" />
      <path opacity=".6" d="M60 11c9 12 18 13 35 14 0 17 2 26 14 35-12 9-14 18-14 35-17 1-26 2-35 14-9-12-18-13-35-14 0-17-2-26-14-35 12-9 14-18 14-35 17-1 26-2 35-14Z" />
      {kind === "haldi" && <>
        <g data-motif-part fill="currentColor" fillOpacity=".17">
          {Array.from({ length: 12 }, (_, index) => (
            <ellipse key={index} cx="60" cy="33" rx="7" ry="18"
              fillOpacity={index % 3 === 0 ? .37 : .14} transform={`rotate(${index * 30} 60 60)`} />
          ))}
        </g>
        <circle cx="60" cy="60" r="19" />
        <circle cx="60" cy="60" r="13" strokeDasharray="1 3" />
        <circle cx="60" cy="60" r="6" />
      </>}
      {kind === "sangeet" && <>
        <path d="M40 72c-8 4-10 12-6 17 5 6 15 3 22-3 8-7 9-13 4-18-5-5-13-3-20 4Z" fill="currentColor" fillOpacity=".13" />
        <path d="m51 69 28-34m-22 38 29-34m-9-6 4-6 11 10-4 6Zm-34 47 9-7m-5 11 9-8M68 42l5 4m-11 3 5 4m5 11 5 4m-11 3 5 4" />
        <path data-motif-part d="M38 52V37l11-3v13m-11 5c-2-3-8 0-6 3 2 2 6 0 6-3Zm11-5c-2-3-8 0-6 3 2 2 6 0 6-3Z" />
      </>}
      {kind === "wedding" && <>
        <path d="M27 88h66m-60-5h54m-48-4V56m42 23V56m-46 0h50m-54-6 29-19 29 19H31Zm9 0c4-9 12-20 20-24 8 4 16 15 20 24M60 26v-8m-9 62V68c0-9 18-9 18 0v12m-23-1V57m28 22V57" />
        <path fill="currentColor" fillOpacity=".16" d="m31 50 29-19 29 19Z" />
        <circle cx="60" cy="17" r="2" />
        <g data-motif-part fill="currentColor" fillOpacity=".19">
          <path d="M34 36c0 5 2 7 7 7-5 0-7 2-7 7 0-5-2-7-7-7 5 0 7-2 7-7Z" />
          <path d="M86 36c0 5 2 7 7 7-5 0-7 2-7 7 0-5-2-7-7-7 5 0 7-2 7-7Z" />
        </g>
      </>}
      {kind === "reception" && <>
        <path d="M30 70c6 13 16 19 30 19s24-6 30-19H30Zm6 0c4 4 8 6 13 6 5 0 8-2 11-6 3 4 6 6 11 6 5 0 9-2 13-6M42 91h36" fill="currentColor" fillOpacity=".13" />
        <path d="M40 55h-8m4-4v8m52-4h-8m4-4v8" />
        <g data-motif-part>
          <path d="M60 65c-15-2-15-15 0-36 15 21 15 34 0 36Z" fill="currentColor" fillOpacity=".13" />
          <path d="M60 65c-7-3-7-9 0-18 7 9 7 15 0 18Z" />
        </g>
      </>}
    </svg>
  );
}
