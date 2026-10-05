/**
 * Socials and contact links.
 *
 * Content source: the EXISTING `Contact.astro` and `Footer.astro`. URLs are copied from there.
 * Per AGENTS.md rule 9 and the Default decisions table, the phone number stays in this file (code
 * only) and is never copied into docs, logs or the review report.
 *
 * TODO (owner):
 *   - `facebook` and `messenger` were not present on the existing site. Fill in the URLs, or leave
 *     them empty: a tile with no `href` renders as a non-interactive `div`, never a dead link.
 */
export const socials = [
  {
    label: 'LinkedIn',
    sub: 'in/eric-james-sonio',
    url: 'https://www.linkedin.com/in/eric-james-sonio-32ba08365/',
    icon: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5M.25 8.25h4.5V24H.25zM8.5 8.25h4.31v2.15h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.16V24H8.5z',
  },
  {
    label: 'GitHub',
    sub: 'EricJamesSonio',
    url: 'https://github.com/EricJamesSonio',
    icon: 'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.3-.6-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3',
  },
  {
    label: 'Facebook',
    sub: '',
    url: '',
    icon: 'M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12',
  },
];

export const contacts = [
  {
    label: 'Email',
    sub: 'Send a message',
    url: 'mailto:ericjamessonio7@gmail.com',
    icon: 'M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2.1 1.4L12 12l7.9-5.6zM4 19h16V7.4l-8 5.6-8-5.6z',
  },
  {
    label: 'Phone',
    sub: 'Call or text',
    url: 'tel:+639687637694',
    icon: 'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1z',
  },
  {
    label: 'Messenger',
    sub: '',
    url: '',
    icon: 'M12 2C6.3 2 2 6.2 2 11.8c0 3.2 1.5 6 3.8 7.8V23l3.3-1.8c.9.3 1.9.4 2.9.4 5.7 0 10-4.2 10-9.8S17.7 2 12 2m1 13.6-2.5-2.7-4.9 2.7L11 9.9l2.6 2.7 4.8-2.7z',
  },
];

export const location = 'Pandi, Bulacan';

export default { socials, contacts, location };
