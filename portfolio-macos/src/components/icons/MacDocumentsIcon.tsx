interface MacDocumentsIconProps {
size?: number;
className?: string;
}

export const MacDocumentsIcon = ({ size = 64, className }: MacDocumentsIconProps) => {
return (
<svg
width={size}
height={size}
viewBox="0 0 64 64"
fill="none"
xmlns="http://www.w3.org/2000/svg"
className={className}
>
<defs>
<linearGradient id="docFolder" x1="32" y1="8" x2="32" y2="58" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#5AC8FA" />
<stop offset="50%" stopColor="#34AADC" />
<stop offset="100%" stopColor="#007AFF" />
</linearGradient>
<linearGradient id="docFolderInner" x1="32" y1="18" x2="32" y2="54" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#4AB8E8" />
<stop offset="100%" stopColor="#2899C8" />
</linearGradient>
<linearGradient id="docPaper" x1="36" y1="12" x2="36" y2="48" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#FFFFFF" />
<stop offset="100%" stopColor="#E8E8E8" />
</linearGradient>
<linearGradient id="docPaperBack" x1="32" y1="14" x2="32" y2="46" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#F0F0F0" />
<stop offset="100%" stopColor="#D0D0D0" />
</linearGradient>
<filter id="docShadow" x="-20%" y="-20%" width="140%" height="140%">
<feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.2" />
</filter>
<filter id="docPaperShadow" x="-20%" y="-20%" width="140%" height="140%">
<feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.15" />
</filter>
</defs>
{/* Back folder panel */}
<path
d="M6 18 C6 15 8 13 11 13 L25 13 L29 17 L53 17 C56 17 58 19 58 22 L58 52 C58 55 56 57 53 57 L11 57 C8 57 6 55 6 52 Z"
fill="url(#docFolder)"
filter="url(#docShadow)"
/>
{/* Back paper (slightly offset) */}
<rect
x="18"
y="10"
width="28"
height="36"
rx="2"
fill="url(#docPaperBack)"
transform="rotate(-3 32 28)"
filter="url(#docPaperShadow)"
/>
{/* Front paper */}
<rect
x="20"
y="8"
width="28"
height="36"
rx="2"
fill="url(#docPaper)"
transform="rotate(2 34 26)"
filter="url(#docPaperShadow)"
/>
{/* Paper lines on front paper */}
<g transform="rotate(2 34 26)">
<line x1="25" y1="16" x2="43" y2="16" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" />
<line x1="25" y1="22" x2="43" y2="22" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" />
<line x1="25" y1="28" x2="43" y2="28" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" />
<line x1="25" y1="34" x2="38" y2="34" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" />
</g>
{/* Front folder panel */}
<path
d="M6 24 C6 22 8 20 11 20 L53 20 C56 20 58 22 58 24 L58 52 C58 55 56 57 53 57 L11 57 C8 57 6 55 6 52 Z"
fill="url(#docFolderInner)"
opacity="0.95"
/>
{/* Folder highlight */}
<path
d="M8 24 C8 23 9 21 11 21 L20 21 L20 52 C20 54 18 56 16 56 L11 56 C9 56 8 54 8 52 Z"
fill="white"
opacity="0.15"
/>
{/* Bottom shadow */}
<ellipse
cx="32"
cy="58"
rx="24"
ry="2"
fill="black"
opacity="0.1"
/>
</svg>
);
};