// AIHAA team roster — single source for the Pasukan section on
// /tentang-kami. Site is BM-only (i18n toggle OFF), so team copy lives
// here as plain data, NOT in translations.ts. Roles are Bahasa Malaysia.
// Photos: member portraits 800x800 square, group photos 1600x900.

export interface TeamMember {
  name: string;
  role: string; // Bahasa Malaysia
  photo: string; // /images/team/members/<slug>.webp
}

export interface TeamDepartment {
  title: string; // Bahasa Malaysia section heading
  members: TeamMember[];
}

export const TEAM_DEPARTMENTS: TeamDepartment[] = [
  {
    title: "Pengurusan",
    members: [
      { name: "Haziq", role: "Penolong Pengurusan", photo: "/images/team/members/haziq.webp" },
      { name: "Nazlee", role: "Pengurus Teknikal", photo: "/images/team/members/nazlee.webp" },
    ],
  },
  {
    title: "Jualan",
    members: [
      { name: "Azri", role: "Perunding Jualan", photo: "/images/team/members/azri.webp" },
      { name: "Adibah", role: "Perunding Jualan", photo: "/images/team/members/adibah.webp" },
      { name: "Aidil", role: "Perunding Jualan", photo: "/images/team/members/aidil.webp" },
      { name: "Firdaus", role: "Perunding Jualan", photo: "/images/team/members/firdaus.webp" },
      { name: "Rahin", role: "Perunding Jualan", photo: "/images/team/members/rahin.webp" },
    ],
  },
  {
    title: "Khidmat Pelanggan",
    members: [
      { name: "Afiq", role: "Eksekutif Khidmat Pelanggan", photo: "/images/team/members/afiq.webp" },
      { name: "Akim", role: "Eksekutif Khidmat Pelanggan", photo: "/images/team/members/akim.webp" },
    ],
  },
  {
    title: "Admin, Operasi & Kewangan",
    members: [
      { name: "Alia", role: "Admin Kemasukan Data", photo: "/images/team/members/alia.webp" },
      { name: "Hanis", role: "Admin Kemasukan Data", photo: "/images/team/members/hanis.webp" },
      { name: "Syahera", role: "Admin Logistik", photo: "/images/team/members/syahera.webp" },
      { name: "Amar", role: "Juruteknik Pembaikan", photo: "/images/team/members/amar.webp" },
      { name: "Mira", role: "Akauntan", photo: "/images/team/members/mira.webp" },
      { name: "Sofia", role: "Eksekutif Sumber Manusia", photo: "/images/team/members/sofia.webp" },
    ],
  },
  {
    title: "Kreatif & Pemasaran",
    members: [
      { name: "Yana", role: "Pencipta Kandungan", photo: "/images/team/members/yana.webp" },
      { name: "Pat", role: "Pereka Grafik", photo: "/images/team/members/pat.webp" },
      { name: "Amin", role: "Eksekutif Pemasaran TikTok", photo: "/images/team/members/amin.webp" },
    ],
  },
];

// 3 group photos — displayed together as a "Pasukan Kami" strip.
export const TEAM_GROUP_PHOTOS = [
  { src: "/images/team/group/pengurusan.webp", caption: "Pasukan Pengurusan" },
  { src: "/images/team/group/jualan.webp", caption: "Pasukan Jualan" },
  { src: "/images/team/group/admin-operasi.webp", caption: "Pasukan Admin & Operasi" },
];
