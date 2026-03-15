interface TodoLogoProps {
  size?: number
}

export const TodoLogo = ({ size = 48 }: TodoLogoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect x="4" y="4" width="56" height="56" rx="14" fill="currentColor" />
    <path
      d="M18 26h20v2H18V26zm0 8h16v2H18V34zm0 8h22v2H18V42z"
      fill="white"
    />
    <circle cx="44" cy="26" r="12" fill="white" />
    <path
      d="M40 26l3.5 3.5L48 22"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)
