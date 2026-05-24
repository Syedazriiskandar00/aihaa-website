// Gallery photos for /galeri. Real installation photos from the
// field. Width / height fields are the true source dimensions —
// used by next/image to size the placeholder and by the lightbox
// to compute the slide layout (so the open animation doesn't shift).
//
// Most photos are portrait 3:4-ish. Two outdoor entries (outdoor-14,
// outdoor-15) are landscape — they'll get center-cropped inside the
// 3:4 grid card via object-cover, but the lightbox renders them at
// their true aspect so customers see the full frame on click.
//
// To add / remove: edit this array. The /galeri page renders all
// entries in declared order. No filter UI today (Azri direction);
// the `category` field is here to make a future filter toggle a
// one-line addition.

export type GalleryCategory = "outdoor" | "indoor";

export type GalleryImage = {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const galleryImages: GalleryImage[] = [
  // ─────────── OUTDOOR (15) ───────────
  {
    id: "outdoor-1",
    category: "outdoor",
    src: "/images/galeri/outdoor-1.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 1",
    width: 870,
    height: 1280,
  },
  {
    id: "outdoor-2",
    category: "outdoor",
    src: "/images/galeri/outdoor-2.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 2",
    width: 960,
    height: 1280,
  },
  {
    id: "outdoor-3",
    category: "outdoor",
    src: "/images/galeri/outdoor-3.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 3",
    width: 677,
    height: 1280,
  },
  {
    id: "outdoor-4",
    category: "outdoor",
    src: "/images/galeri/outdoor-4.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 4",
    width: 720,
    height: 960,
  },
  {
    id: "outdoor-5",
    category: "outdoor",
    src: "/images/galeri/outdoor-5.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 5",
    width: 720,
    height: 960,
  },
  {
    id: "outdoor-6",
    category: "outdoor",
    src: "/images/galeri/outdoor-6.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 6",
    width: 720,
    height: 960,
  },
  {
    id: "outdoor-7",
    category: "outdoor",
    src: "/images/galeri/outdoor-7.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 7",
    width: 959,
    height: 1280,
  },
  {
    id: "outdoor-8",
    category: "outdoor",
    src: "/images/galeri/outdoor-8.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 8",
    width: 827,
    height: 1280,
  },
  {
    id: "outdoor-9",
    category: "outdoor",
    src: "/images/galeri/outdoor-9.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 9",
    width: 793,
    height: 1280,
  },
  {
    id: "outdoor-10",
    category: "outdoor",
    src: "/images/galeri/outdoor-10.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 10",
    width: 959,
    height: 1280,
  },
  {
    id: "outdoor-11",
    category: "outdoor",
    src: "/images/galeri/outdoor-11.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 11",
    width: 960,
    height: 1280,
  },
  {
    id: "outdoor-12",
    category: "outdoor",
    src: "/images/galeri/outdoor-12.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 12",
    width: 486,
    height: 1080,
  },
  {
    id: "outdoor-13",
    category: "outdoor",
    src: "/images/galeri/outdoor-13.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 13",
    width: 805,
    height: 1280,
  },
  {
    id: "outdoor-14",
    category: "outdoor",
    src: "/images/galeri/outdoor-14.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 14",
    width: 1179,
    height: 735,
  },
  {
    id: "outdoor-15",
    category: "outdoor",
    src: "/images/galeri/outdoor-15.jpg",
    alt: "Pemasangan AIHAA luar rumah — pelanggan 15",
    width: 1179,
    height: 558,
  },

  // ─────────── INDOOR (2) ───────────
  {
    id: "indoor-1",
    category: "indoor",
    src: "/images/galeri/indoor-1.jpg",
    alt: "Pemasangan AIHAA dalam rumah — pelanggan 1",
    width: 720,
    height: 1280,
  },
  {
    id: "indoor-2",
    category: "indoor",
    src: "/images/galeri/indoor-2.jpg",
    alt: "Pemasangan AIHAA dalam rumah — pelanggan 2",
    width: 570,
    height: 600,
  },
];
