interface MacSafariIconProps {
size?: number;
className?: string;
}

export const MacSafariIcon = ({ size = 64, className }: MacSafariIconProps) => {
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
{/* Main compass gradient */}
<linearGradient id="safariBase" x1="32" y1="2" x2="32" y2="62" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#19D3FF" />
<stop offset="30%" stopColor="#00B8F5" />
<stop offset="70%" stopColor="#0099E0" />
<stop offset="100%" stopColor="#0080CC" />
</linearGradient>
{/* Inner circle gradient */}
<linearGradient id="safariInner" x1="32" y1="8" x2="32" y2="56" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#FFFFFF" />
<stop offset="100%" stopColor="#E8E8E8" />
</linearGradient>
{/* Red needle gradient */}
<linearGradient id="needleRed" x1="32" y1="14" x2="32" y2="32" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#FF3B30" />
<stop offset="100%" stopColor="#D62D23" />
</linearGradient>
{/* White needle gradient */}
<linearGradient id="needleWhite" x1="32" y1="32" x2="32" y2="50" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="#FFFFFF" />
<stop offset="100%" stopColor="#E0E0E0" />
</linearGradient>
<filter id="safariShadow" x="-10%" y="-10%" width="120%" height="130%">
<feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.25" />
</filter>
<filter id="needleShadow" x="-50%" y="-50%" width="200%" height="200%">
<feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.3" />
</filter>
</defs>
{/* Outer circle - blue compass body */}
<circle
cx="32"
cy="32"
r="30"
fill="url(#safariBase)"
filter="url(#safariShadow)"
/>
{/* Inner highlight ring */}
<circle
cx="32"
cy="32"
r="28"
fill="none"
stroke="#40E0FF"
strokeWidth="1"
opacity="0.5"
/>
{/* Inner white circle */}
<circle
cx="32"
cy="32"
r="22"
fill="url(#safariInner)"
/>
{/* Compass tick marks */}
{[...Array(16)].map((_, i) => {
const angle = (i * 22.5 * Math.PI) / 180;
const isMajor = i % 4 === 0;
const innerR = isMajor ? 23 : 24.5;
const outerR = 27;
const x1 = 32 + Math.sin(angle) * innerR;
const y1 = 32 - Math.cos(angle) * innerR;
const x2 = 32 + Math.sin(angle) * outerR;
const y2 = 32 - Math.cos(angle) * outerR;
return (
<line
key={i}
x1={x1}
y1={y1}
x2={x2}
y2={y2}
stroke={isMajor ? "#0080CC" : "#40A0D0"}
strokeWidth={isMajor ? 2 : 1}
strokeLinecap="round"
/>
);
})}
{/* Compass needle - Red (North) */}
<path
d="M32 14 L36 32 L32 30 L28 32 Z"
fill="url(#needleRed)"
filter="url(#needleShadow)"
/>
{/* Compass needle - White (South) */}
<path
d="M32 50 L36 32 L32 34 L28 32 Z"
fill="url(#needleWhite)"
filter="url(#needleShadow)"
/>
{/* Center dot */}
<circle cx="32" cy="32" r="3" fill="#555555" />
<circle cx="32" cy="32" r="2" fill="#888888" />
<circle cx="32" cy="32" r="1" fill="#AAAAAA" />
{/* Outer ring shadow */}
<circle
cx="32"
cy="32"
r="30"
fill="none"
stroke="#006699"
strokeWidth="0.5"
opacity="0.5"
/>
</svg>
);
};