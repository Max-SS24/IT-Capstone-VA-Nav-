import React from 'react';

type IconProps = { size?: number; className?: string; style?: React.CSSProperties };

const icon = (d: string, opts?: { viewBox?: string; strokeWidth?: number }) =>
  ({ size = 20, className = '', style }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={opts?.viewBox ?? '0 0 24 24'}
      fill="none"
      stroke="currentColor"
      strokeWidth={opts?.strokeWidth ?? 1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d={d} />
    </svg>
  );

const iconPaths = (paths: string[], opts?: { viewBox?: string; strokeWidth?: number }) =>
  ({ size = 20, className = '', style }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={opts?.viewBox ?? '0 0 24 24'}
      fill="none"
      stroke="currentColor"
      strokeWidth={opts?.strokeWidth ?? 1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );

export const SearchIcon = icon('m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z');
export const MenuIcon = iconPaths(['M3 12h18', 'M3 6h18', 'M3 18h18']);
export const XIcon = iconPaths(['M18 6 6 18', 'M6 6l12 12']);
export const ChevronRightIcon = icon('m9 18 6-6-6-6');
export const ChevronDownIcon = icon('m6 9 6 6 6-6');
export const ExternalLinkIcon = iconPaths(['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14 21 3']);
export const PhoneIcon = icon('M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.77 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.72 0h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z');
export const CheckCircleIcon = iconPaths(['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'M22 4 12 14.01l-3-3']);
export const ShieldIcon = icon('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z');
export const UserIcon = iconPaths(['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z']);
export const MessageIcon = icon('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z');
export const PlusIcon = iconPaths(['M12 5v14', 'M5 12h14']);
export const BookmarkIcon = icon('m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z');
export const SettingsIcon = iconPaths(['M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z']);
export const HelpCircleIcon = iconPaths(['M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01', 'M22 12A10 10 0 1 1 2 12a10 10 0 0 1 20 0z']);
export const AlertTriangleIcon = iconPaths(['m10.29 3.86-8.6 14.9A2 2 0 0 0 3.45 21h17.1a2 2 0 0 0 1.76-2.95l-8.6-14.9a2 2 0 0 0-3.52 0z', 'M12 9v4', 'M12 17h.01']);
export const BookOpenIcon = iconPaths(['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z']);
export const GridIcon = iconPaths(['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z']);
export const ListIcon = iconPaths(['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01']);
export const FilterIcon = icon('M22 3H2l8 9.46V19l4 2v-8.54z');
export const MapPinIcon = iconPaths(['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z']);
export const SendIcon = icon('M22 2 11 13M22 2 15 22 11 13 2 9l20-7z');
export const PaperclipIcon = icon('m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48');
export const LockIcon = iconPaths(['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z', 'M7 11V7a5 5 0 0 1 10 0v4']);
export const HomeIcon = iconPaths(['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10']);
export const TrendingUpIcon = iconPaths(['M23 6 13.5 15.5 8.5 10.5 1 18', 'M17 6h6v6']);
export const UsersIcon = iconPaths(['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75']);
export const CheckIcon = icon('M20 6 9 17l-5-5');
export const EditIcon = iconPaths(['M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7', 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z']);
export const TrashIcon = iconPaths(['M3 6h18', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2']);
export const ArchiveIcon = iconPaths(['M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', 'M3.27 6.96 12 12.01l8.73-5.05', 'M12 22.08V12']);
export const RefreshIcon = iconPaths(['M23 4v6h-6', 'M1 20v-6h6', 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15']);
export const StarIcon = icon('m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z');
export const ClockIcon = iconPaths(['M12 22A10 10 0 1 0 2 12a10 10 0 0 0 10 10z', 'M12 6v6l4 2']);
export const InfoIcon = iconPaths(['M12 22A10 10 0 1 0 2 12a10 10 0 0 0 10 10z', 'M12 16v-4', 'M12 8h.01']);
export const BarChart2Icon = iconPaths(['M18 20V10', 'M12 20V4', 'M6 20v-6']);
export const FileTextIcon = iconPaths(['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8']);
export const LogOutIcon = iconPaths(['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9']);
export const EyeIcon = iconPaths(['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z']);
