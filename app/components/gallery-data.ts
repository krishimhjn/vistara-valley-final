/* =========================================
   GALLERY DATA  –  edit photos & captions here
   (put this file next to Gallery.tsx)
   ========================================= */

export const IMG = "/images";

export type Item = {
  src: string;
  alt: string;
  caption: string;
  category: string;
  /* optional CSS object-position, e.g. "center 40%" */
  position?: string;
};

export type Group = {
  id: string;
  label: string;
  items: Item[];
};

export type VideoItem = { src: string; poster?: string; caption: string };

/* Soft placeholder shown while a photo loads (no blur generation needed) */
export const BLUR_DATA_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='8' height='6'><rect width='8' height='6' fill='#d9d4c6'/></svg>"
)}`;

/*
  Builds items like garden1.jpg ... garden7.jpg.

  captions  → in the same order as the image numbers
  positions → optional, keyed by image number (1 = first image).
              Use it when the important part of a photo gets cropped,
              e.g. { 3: "center 30%", 5: "left center" }
*/
function build(
  prefix: string,
  count: number,
  label: string,
  altText: string,
  captions: string[] = [],
  positions: Record<number, string> = {}
): Item[] {
  return Array.from({ length: count }, (_, i) => {
    const caption = captions[i] ?? `${label} view ${i + 1}`;

    return {
      src: `${IMG}/${prefix}${i + 1}.jpg`,
      alt: `${altText} – ${caption}`,
      caption,
      category: label,
      position: positions[i + 1],
    };
  });
}

/* ⚠️ These captions are generic placeholders – rewrite them so each one
   matches what the photo really shows. */
const garden = build(
  "garden",
  7,
  "Garden",
  "Landscaped garden at Vistara Valley, Khandwa Road, Khargone",
  [
    "Landscaped central lawn",
    "Garden pathway",
    "Seating corner",
    "Green open space",
    "Evening view of the garden",
    "Planted borders",
    "Garden walkway",
  ]
);

const park = build(
  "park",
  2,
  "Park",
  "Park and play area at Vistara Valley, Khargone",
  ["Park and play area", "Open park space"]
);

const entrance = build(
  "ent",
  2,
  "Entrance",
  "Grand entrance gateway of Vistara Valley, Khargone",
  ["Main entrance gateway", "Entrance at dusk"]
);

const amenities = build(
  "ami",
  6,
  "Amenities",
  "Amenities at Vistara Valley residential plots, Khargone",
  [
    "Community amenity",
    "Clubhouse area",
    "Sit-out space",
    "Walking area",
    "Common facilities",
    "Resident amenities",
  ]
);

/*
  Park and Entrance have only 2 photos each, so they share one
  "Highlights" tab instead of two thin ones. Each photo still shows
  its own category (Park / Entrance) on the caption.
*/
export const groups: Group[] = [
  { id: "garden", label: "Garden", items: garden },
  { id: "amenities", label: "Amenities", items: amenities },
  { id: "highlights", label: "Highlights", items: [...entrance, ...park] },
];

/*
  🎬 Videos (optional). Put the files in /public/videos.
  Leave the list empty and the Videos tab stays hidden.
  Example:
  { src: "/videos/walkthrough.mp4", poster: "/images/video-poster.jpg", caption: "Drone view of Vistara Valley" }
*/
export const videos: VideoItem[] = [];

/* mixes the categories so the "All" tab starts with variety */
function interleave(lists: Item[][]): Item[] {
  const result: Item[] = [];
  const longest = Math.max(...lists.map((l) => l.length));

  for (let i = 0; i < longest; i++) {
    for (const list of lists) {
      if (list[i]) result.push(list[i]);
    }
  }

  return result;
}

export const allItems = interleave(groups.map((g) => g.items));

export const tabs: { id: string; label: string; count: number }[] = [
  { id: "all", label: "All", count: allItems.length },
  ...groups.map((g) => ({ id: g.id, label: g.label, count: g.items.length })),
  ...(videos.length
    ? [{ id: "videos", label: "Videos", count: videos.length }]
    : []),
];
