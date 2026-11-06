export default function NavSculpture({ name }: { name: string }) {
  const id = `nav-${name}`;
  const gold = `url(#${id}-gold)`, ivory = `url(#${id}-ivory)`, edge = `url(#${id}-edge)`;
  return (
    <svg className="nav-sculpture" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff0c5" /><stop offset=".35" stopColor="#dac18a" /><stop offset=".7" stopColor="#a78345" /><stop offset="1" stopColor="#e6cf9c" /></linearGradient>
        <linearGradient id={`${id}-ivory`} x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#ffffff" /><stop offset=".5" stopColor="#eeeae1" /><stop offset="1" stopColor="#afb6bb" /></linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c0a574" /><stop offset="1" stopColor="#755831" /></linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#1b2027" floodOpacity=".22" /></filter>
      </defs>
      <g filter={`url(#${id}-shadow)`}>
        {name === "home" && <>
          <path d="m12 23 13-11 13 11v17H12Z" fill={ivory} />
          <path d="m38 23 5-4v17l-5 4Z" fill="#9da7af" />
          <path d="M7 23 24 7l18 16-5 4-13-13-13 13Z" fill={gold} />
          <path d="m24 7 4-3 18 16-4 3Z" fill={edge} />
          <path d="M23 40V29a4 4 0 0 1 8 0v11" fill={edge} />
          <rect x="15" y="28" width="5" height="6" rx="1" fill={gold} />
          <path d="m11 24 13-12 13 12" fill="none" stroke="#fff1d0" strokeWidth="1" />
        </>}
        {name === "products" && <>
          <path d="M6 22h16v16c0 6-16 6-16 0Z" fill={ivory} /><ellipse cx="14" cy="22" rx="8" ry="4" fill={gold} /><path d="M8 18h12v4c0 3-12 3-12 0Z" fill={edge} /><ellipse cx="14" cy="18" rx="6" ry="2.8" fill={gold} />
          <path d="M26 20h16v18c0 6-16 6-16 0Z" fill={ivory} /><ellipse cx="34" cy="20" rx="8" ry="4" fill={gold} /><path d="M28 16h12v4c0 3-12 3-12 0Z" fill={edge} /><ellipse cx="34" cy="16" rx="6" ry="2.8" fill={gold} />
          <path d="M15 13h18v25c0 7-18 7-18 0Z" fill={ivory} /><path d="M17 10h14v5c0 4-14 4-14 0Z" fill={edge} /><ellipse cx="24" cy="10" rx="7" ry="3" fill={gold} />
          <path d="M23 34c-9-1-8-10-8-10 9-1 12 4 8 10Z" fill="#6c8066" /><path d="M24 29c-2-8 6-10 6-10 5 8 0 13-6 10Z" fill="#a5b29a" /><path d="m21 34 6-9" stroke="#e2e8d9" strokeWidth=".8" />
        </>}
        {name === "quality" && <>
          <path d="m14 29-3 15 10-5 4 4 2-15m3-1 8 16 2-10 5-1-9-13" fill={edge} />
          <path d="m24 4 5 3 6-1 2 6 5 4-2 6 1 6-6 3-3 6-6-1-6 3-5-4-6-1-1-7-4-5 4-5 1-6 7-1Z" fill={gold} />
          <circle cx="24" cy="21" r="12" fill={edge} /><circle cx="24" cy="20" r="10.5" fill={ivory} />
          <path d="m18 20 4 4 8-9" fill="none" stroke="#9b793e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 14a12 12 0 0 1 15-4" fill="none" stroke="#fff4d6" strokeWidth="1" />
        </>}
        {name === "exports" && <>
          <path d="M13 11h12v15H13Z" fill={ivory} /><path d="m25 11 5 3v12h-5Z" fill="#9ca7ad" /><path d="m13 11 5-3 12 6-5 3Z" fill="#fff7e4" />
          <path d="M6 24h14v10H6Z" fill={gold} /><path d="M21 20h14v14H21Z" fill={ivory} /><path d="m35 20 7 4v10h-7Z" fill={edge} />
          <path d="M4 31h26l14-5-5 13c-10 6-21 6-31 0Z" fill={gold} /><path d="m30 31 14-5-5 13-9 4Z" fill={edge} />
          <path d="M8 35h21M10 27h6m8-3h8M17 16h4" stroke="#fff8e7" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M5 43q5 3 10 0 5 3 10 0 5 3 10 0 5 3 9 0" fill="none" stroke="#9caeb8" strokeWidth="1.4" />
        </>}
        {name === "contact" && <>
          <path d="m6 18 19-9 18 10v21L6 38Z" fill={edge} />
          <path d="m12 9 21-4 4 27-21 5Z" fill={ivory} />
          <path d="m18 13 10-2m-9 7 10-2" stroke="#bdac88" strokeWidth="1.8" strokeLinecap="round" />
          <path d="m6 18 18 12 18-11v21H6Z" fill={ivory} />
          <path d="m6 38 15-13 3 5 4-5 14 15H6Z" fill="#d5d6cf" />
          <path d="m6 18 18 12 18-11" fill="none" stroke="#fefcf3" strokeWidth="1.3" />
          <circle cx="25" cy="31" r="6" fill={gold} /><path d="m22 31 2 2 4-4" fill="none" stroke="#fff8e7" strokeWidth="1.3" strokeLinecap="round" />
        </>}
      </g>
    </svg>
  );
}
