/**
 * Certifications and awards.
 *
 * The EXISTING site had no certifications section and no certificate images, and
 * `content-seed.md` lists certificates belonging to a different person, so nothing is
 * invented here. The list is intentionally empty and the card renders an honest empty state.
 *
 * TODO (owner): add your real certificates, e.g.
 *   { name: 'JavaScript Developer Certification', issuer: 'freeCodeCamp',
 *     image: 'JSCertificate.png' }
 * Drop the image into `public/assets/images/` and it appears in the lightbox automatically.
 * A build-time existence check hides the expand icon when the image is missing, so an entry
 * without an image still renders as a plain row.
 */
export const certs = [];

/** Absolute path to the image folder (resolved from this file, see the note in projects.js). */
const IMG_DIR = new URL('../../public/assets/images/', import.meta.url);
const fs = await import('node:fs/promises');

export async function getCerts() {
  return Promise.all(
    certs.map(async (c) => {
      if (!c.image) return { ...c, hasImage: false };
      try {
        await fs.access(new URL(c.image, IMG_DIR));
        return { ...c, hasImage: true, src: `/Portfolio/assets/images/${c.image}` };
      } catch {
        return { ...c, hasImage: false };
      }
    })
  );
}

export default getCerts;
