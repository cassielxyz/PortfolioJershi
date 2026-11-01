import React from 'react';

interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, size = 44, className = '' }) => {
  const norm = name.toLowerCase().trim();

  // 1. SPRING BOOT (Official Spring Green Leaf on Hexagon)
  if (norm.includes('spring')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="Spring Boot">
        <path d="M16 2.5L3.5 9.5V23.5L16 30.5L28.5 23.5V9.5L16 2.5Z" fill="#6DB33F" fillOpacity="0.18" stroke="#6DB33F" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M16.2 8C11.5 8 8 11.6 8 16.2C8 20.8 11.6 24.5 16.2 24.5C20.8 24.5 24.5 20.8 24.5 16.2C24.5 14.8 24.1 13.5 23.4 12.4L20.8 15C21 15.4 21.1 15.8 21.1 16.2C21.1 18.9 18.9 21.1 16.2 21.1C13.5 21.1 11.3 18.9 11.3 16.2C11.3 13.5 13.5 11.3 16.2 11.3C16.6 11.3 17 11.4 17.4 11.6L20 9C18.9 8.3 17.6 8 16.2 8Z" fill="#6DB33F" />
        <path d="M16 13.5C14.6 13.5 13.5 14.6 13.5 16C13.5 17.4 14.6 18.5 16 18.5C17.4 18.5 18.5 17.4 18.5 16C18.5 14.6 17.4 13.5 16 13.5Z" fill="#6DB33F" />
        <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
      </svg>
    );
  }

  // 2. CORE JAVA & OOP (Official Java Coffee Cup & Steam)
  if (norm.includes('java') && !norm.includes('script')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="Java">
        {/* Blue Steam */}
        <path d="M13.5 20.2C16.8 19.8 19.8 19.8 23.2 20.2C23.9 19.2 23.9 18.4 22 17.8C19.5 16.8 17 17.1 15.8 18.2C15 18.8 14.5 19.6 13.5 20.2Z" fill="#5382A1" />
        {/* Red / Orange Coffee Cup & Saucer */}
        <path d="M12 23.2C16.5 23.7 20.8 23.7 24.8 23.2C25.5 22.5 25.1 21.8 23.5 21.4C20.2 20.8 16.5 20.8 14 21.4C13.2 21.8 13 22.5 12 23.2Z" fill="#E76F00" />
        <path d="M15.2 14.2C16.8 12.2 16.5 10.5 14 8.2C12.8 10.8 13.5 13 15.2 14.2Z" fill="#EA2D2E" />
        <path d="M19 12.5C21.2 10.2 20.8 7.8 18.2 4.8C17.5 7.8 18.2 10.5 19 12.5Z" fill="#EA2D2E" />
        <path d="M9.2 26.2C14.5 27.8 20.8 27.8 25.8 26.2C26.2 25.5 25.5 25 24.2 24.5C19.5 23.8 14 23.8 10.5 24.5C9.2 25 9 25.5 9.2 26.2Z" fill="#E76F00" opacity="0.85" />
        <ellipse cx="17.5" cy="27.5" rx="8.2" ry="1.4" fill="#5382A1" opacity="0.6" />
      </svg>
    );
  }

  // 3. REACT (Official React Cyan Atom Orbits)
  if (norm.includes('react')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="React.js">
        <ellipse cx="16" cy="16" rx="13.2" ry="5.2" stroke="#61DAFB" strokeWidth="1.8" />
        <ellipse cx="16" cy="16" rx="13.2" ry="5.2" transform="rotate(60 16 16)" stroke="#61DAFB" strokeWidth="1.8" />
        <ellipse cx="16" cy="16" rx="13.2" ry="5.2" transform="rotate(120 16 16)" stroke="#61DAFB" strokeWidth="1.8" />
        <circle cx="16" cy="16" r="2.6" fill="#61DAFB" />
      </svg>
    );
  }

  // 4. TYPESCRIPT (Official TypeScript Blue Icon with Crisp "TS")
  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="TypeScript">
        <rect x="2.5" y="2.5" width="27" height="27" rx="5.5" fill="#3178C6" />
        <path d="M7.5 12.5H16.5M12 12.5V23" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24.5 15C24 13.6 22.6 13 21 13.5C19.2 14 18.8 15.5 20.2 17C21.2 18.5 23.6 18.5 24.2 20C24.8 21.6 23.2 22.8 21 22.2C19.2 21.8 18.5 20.6 18.5 19.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 5. POSTGRESQL (Official Slonik Elephant Head Silhouette)
  if (norm.includes('postgres')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="PostgreSQL">
        {/* Slonik Head & Trunk */}
        <path 
          d="M17.2 4C11.8 4 7.5 7.8 7.2 13C6.2 13.8 5.5 15.2 5.5 17C5.5 20.2 8 22.8 11.2 23V27.5L15 25.2V22.8C15.8 23 16.5 23 17.2 23C23.5 23 27.5 18.5 27.5 13.2C27.5 8 23.5 4 17.2 4Z" 
          fill="#336791" 
        />
        {/* Ear Shadow / Contour */}
        <path d="M12 14.5C12 17.5 14.2 19.8 17 19.8C19.8 19.8 22 17.5 22 14.5" stroke="#4169E1" strokeWidth="1.8" strokeLinecap="round" />
        {/* Slonik Eye */}
        <circle cx="13" cy="11.5" r="1.5" fill="#FFFFFF" />
        {/* Slonik White Tusk */}
        <path d="M10 19.5C9 21.5 8.2 24.2 8.5 26.5C10 26 11.5 23 11.8 20.5" fill="#FFFFFF" />
        {/* Cheek accent */}
        <path d="M22 10.5C22.2 12.5 23.8 13.8 25.2 13.8" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  // 6. SUPABASE (Official Emerald Lightning Bolt)
  if (norm.includes('supabase')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="Supabase">
        <defs>
          <linearGradient id="supaOfficialGrad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3ECF8E" />
            <stop offset="1" stopColor="#24B47E" />
          </linearGradient>
        </defs>
        <path d="M18.8 2.2L5 17.8H16.2L14.5 29.8L28.2 14.2H17L18.8 2.2Z" fill="url(#supaOfficialGrad)" />
      </svg>
    );
  }

  // 7. REST APIS & ARCHITECTURE (Official OpenAPI / Swagger Green Badge)
  if (norm.includes('rest') || (norm.includes('api') && !norm.includes('postman'))) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="REST Architecture">
        <circle cx="16" cy="16" r="13.5" fill="#85EA2D" fillOpacity="0.18" stroke="#85EA2D" strokeWidth="2" />
        <path d="M16 6.5L24 11V21L16 25.5L8 21V11L16 6.5Z" stroke="#85EA2D" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="3.2" fill="#85EA2D" />
        <path d="M16 9.8V12.8M16 19.2V22.2M10.8 13.2L13.4 14.7M18.6 17.3L21.2 18.8M10.8 18.8L13.4 17.3M18.6 14.7L21.2 13.2" stroke="#85EA2D" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // 8. JPA & HIBERNATE (Official Hibernate Dark Steel & Gold Emblem)
  if (norm.includes('jpa') || norm.includes('hibernate')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="Hibernate">
        <path d="M16 3L27 9.5V22.5L16 29L5 22.5V9.5L16 3Z" fill="#59666C" />
        <path d="M11 10.5V21.5M21 10.5V21.5M11 16H21" stroke="#BCAE79" strokeWidth="3" strokeLinecap="round" />
        <path d="M16 7L24 11.5M8 20.5L16 25" stroke="#E67E22" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // 9. PYTHON (Official Blue & Yellow Interlocking Snakes)
  if (norm.includes('python')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="Python">
        <path d="M15.5 3.5C9.5 3.5 10 6.5 10 6.5V9.5H16.5V11H7C4 11 2 13.5 2 17C2 20.5 4.5 21 4.5 21H7V18C7 15 9.5 15 9.5 15H17C19.5 15 20.5 13 20.5 10.5V6.5C20.5 4 18.5 3.5 15.5 3.5Z" fill="#3776AB" />
        <circle cx="12.5" cy="7" r="1.3" fill="#FFFFFF" />
        <path d="M16.5 28.5C22.5 28.5 22 25.5 22 25.5V22.5H15.5V21H25C28 21 30 18.5 30 15C30 11.5 27.5 11 27.5 11H25V14C25 17 22.5 17 22.5 17H15C12.5 17 11.5 19 11.5 21.5V25.5C11.5 28 13.5 28.5 16.5 28.5Z" fill="#FFD43B" />
        <circle cx="19.5" cy="25" r="1.3" fill="#3776AB" />
      </svg>
    );
  }

  // 10. OPENCV (Official RGB Tri-Color Optical Rings)
  if (norm.includes('opencv') || norm.includes('vision') || norm.includes('cv')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="OpenCV">
        {/* Red Ring Top */}
        <circle cx="16" cy="9.5" r="5.5" stroke="#EE2B29" strokeWidth="2.5" />
        <circle cx="16" cy="9.5" r="2" fill="#EE2B29" />
        {/* Green Ring Bottom Left */}
        <circle cx="9.5" cy="22" r="5.5" stroke="#34B143" strokeWidth="2.5" />
        <circle cx="9.5" cy="22" r="2" fill="#34B143" />
        {/* Blue Ring Bottom Right */}
        <circle cx="22.5" cy="22" r="5.5" stroke="#2972BA" strokeWidth="2.5" />
        <circle cx="22.5" cy="22" r="2" fill="#2972BA" />
      </svg>
    );
  }

  // 11. YOLO (Official Ultralytics YOLO Target Frame & Neural Node)
  if (norm.includes('yolo') || norm.includes('tracking') || norm.includes('detection')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="YOLO">
        {/* Outer Tech Square */}
        <rect x="3.5" y="3.5" width="25" height="25" rx="6" fill="#0A0910" stroke="#00F5D4" strokeWidth="1.8" />
        {/* Corner Reticle Brackets */}
        <path d="M7 11V7H11M21 7H25V11M25 21V25H21M11 25H7V21" stroke="#FF007F" strokeWidth="2" strokeLinecap="round" />
        {/* Center Target Down-Chevron & Stem */}
        <path d="M10 13L16 19L22 13" stroke="#00F5D4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 19V25" stroke="#00F5D4" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="16" cy="9.5" r="2.5" fill="#FEE440" />
      </svg>
    );
  }

  // 12. XGBOOST (Official Gradient Boosted Tree Architecture)
  if (norm.includes('xgboost') || norm.includes('ml') || norm.includes('model') || norm.includes('learning')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="XGBoost">
        <path d="M16 3L28 10V22L16 29L4 22V10L16 3Z" fill="#0077B6" fillOpacity="0.18" stroke="#00B4D8" strokeWidth="1.8" />
        <circle cx="16" cy="9" r="3.2" fill="#00B4D8" />
        <circle cx="9.5" cy="20" r="3" fill="#0077B6" />
        <circle cx="22.5" cy="20" r="3" fill="#0077B6" />
        <path d="M14 11.5L11 17.5M18 11.5L21 17.5" stroke="#90E0EF" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 14.5L19 14.5" stroke="#FEE440" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // 13. MYSQL (Official Blue Dolphin "Sakila" with Orange Accent)
  if (norm.includes('mysql') || norm.includes('sql')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="MySQL">
        <path d="M25 15C25 9.5 20.5 5 15 5C11.5 5 8.5 6.8 6.8 9.5C6.2 10.5 6.8 11.8 8 11.8C9.5 11.8 10.8 10.8 12.5 10.8C15 10.8 17.2 12.8 17.2 15.2C17.2 17.5 15.5 19.5 13 19.8L7.5 20.5C6 20.8 5 22.2 5 23.8C5 25.5 7.5 27 12 27C19.5 27 25 21.5 25 15Z" fill="#00758F" />
        <path d="M19 12C20.5 13.2 21.5 15 21.5 17" stroke="#F29111" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9.5" cy="8.5" r="1.2" fill="#FFFFFF" />
      </svg>
    );
  }

  // 14. GIT & GITHUB (Official Git Orange Diamond with Branch Graph)
  if (norm.includes('git')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="Git">
        <rect x="5.5" y="5.5" width="21" height="21" rx="4.5" transform="rotate(45 16 16)" fill="#F05032" />
        <circle cx="11" cy="11" r="2.2" fill="#FFFFFF" />
        <circle cx="11" cy="21" r="2.2" fill="#FFFFFF" />
        <circle cx="21" cy="13.5" r="2.2" fill="#FFFFFF" />
        <path d="M11 13V19" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M11 16C13.5 16 18.5 16 21 13.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  // 15. DOCKER (Official Docker Electric Blue Whale with Shipping Containers)
  if (norm.includes('docker') || norm.includes('container')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="Docker">
        {/* Whale Body */}
        <path d="M3.5 17.5C3.5 17.5 5.5 26 15.5 26C24.5 26 28.5 19.5 28.5 16.5C26 16 23.5 18 21.5 17.5C20.5 16 18 16.5 17 16H3.5V17.5Z" fill="#2496ED" />
        {/* Stacked Containers */}
        <rect x="7" y="10.5" width="3.2" height="3.2" rx="0.5" fill="#48CAE4" />
        <rect x="11.5" y="10.5" width="3.2" height="3.2" rx="0.5" fill="#48CAE4" />
        <rect x="16" y="10.5" width="3.2" height="3.2" rx="0.5" fill="#48CAE4" />
        <rect x="11.5" y="6" width="3.2" height="3.2" rx="0.5" fill="#00B4D8" />
        <rect x="16" y="6" width="3.2" height="3.2" rx="0.5" fill="#00B4D8" />
        {/* Eye */}
        <circle cx="25" cy="19" r="1.2" fill="#FFFFFF" />
      </svg>
    );
  }

  // 16. POSTMAN (Official Postman Orange Circular Herald)
  if (norm.includes('postman') || norm.includes('tool')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-label="Postman">
        <circle cx="16" cy="16" r="13.5" fill="#FF6C37" />
        {/* Flying Superhero Herald Vector */}
        <path d="M9.5 22.5L13.5 11.5L22.5 8.5L19.5 19.5L9.5 22.5Z" fill="#FFFFFF" />
        <path d="M13.5 11.5L19.5 19.5" stroke="#FF6C37" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="15" r="2.2" fill="#FF6C37" />
      </svg>
    );
  }

  // Fallback
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="7" y="7" width="18" height="18" rx="5" fill="#6366F1" fillOpacity="0.2" stroke="#6366F1" strokeWidth="2" />
      <circle cx="16" cy="16" r="3.5" fill="#6366F1" />
      <path d="M16 3V7M16 25V29M3 16H7M25 16H29" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default TechLogo;
