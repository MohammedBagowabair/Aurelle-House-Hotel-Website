import { useEffect, useState, type MouseEvent } from 'react';
import { HeroPic, Pic } from '@/lib/Pic';
import { Lightbox, type Shot } from '@/lib/Lightbox';
import { PHONE_DISPLAY, TEL, generalMsg, roomMsg, waUrl } from '@/lib/wa';
import { CREDITS } from '@/images';
import { MapPlaceholder } from '@/lib/MapPlaceholder';
import {
  WaIcon, IcGuests, IcBed, IcSize, IcArrow, IcPool, IcSpa, IcGym, IcMeet, IcDine, IcKey, IcCar, IcWifi, IcShirt,
  IcShield, IcClock, IcChat, IcCheck, IcPin, IcMail, IcPhone, IcPlus,
} from '@/lib/icons';

const HOTEL = 'Aurelle House Singapore';
const NAV = [
  { href: '#rooms', label: 'Stay' },
  { href: '#facilities', label: 'Facilities' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#location', label: 'Location' },
  { href: '#contact', label: 'Contact' },
];

const ROOMS = [
  {
    id: 'deluxe', img: 'room-deluxe', name: 'Deluxe City Room', alt: 'Hotel room with a king bed, armchair and tall windows over the city',
    text: 'A calm, light-filled room with floor-to-ceiling glass, layered linen and a writing desk facing the skyline.',
    guests: '2 adults', bed: 'King or twin', size: 'Approx. 32 m²',
    amen: ['Rain shower', 'Smart TV and fast Wi-Fi', 'Blackout curtains', 'In-room safe'],
  },
  {
    id: 'premier', img: 'room-premier', name: 'Premier Room', alt: 'Spacious king room with a sofa, armchair and warm lamplight',
    text: 'More room to unwind, with a lounge corner, a generous work desk and a bathroom finished in natural stone.',
    guests: '2 adults', bed: 'King', size: 'Approx. 40 m²',
    amen: ['Separate bathtub and shower', 'Lounge seating', 'Pillow menu', 'Evening turndown'],
  },
  {
    id: 'suite', img: 'room-suite', name: 'Executive Suite', alt: 'Suite living room with a chaise longue, artwork and tall turquoise curtains',
    text: 'A separate living room for meetings or slow mornings, with a king bedroom beyond and a dressing area between.',
    guests: '2 adults + 1 child', bed: 'King', size: 'Approx. 68 m²',
    amen: ['Separate living room', 'Walk-in wardrobe', 'Guest powder room', 'Priority check-in'],
  },
  {
    id: 'family', img: 'room-family', name: 'Family Twin Room', alt: 'Twin room with two large beds, cushions and a window seat',
    text: 'Two generous beds and space to spread out, set up for families travelling with children.',
    guests: '2 adults + 2 children', bed: 'Two queen beds', size: 'Approx. 45 m²',
    amen: ['Cots on request', 'Connecting rooms on request', 'Bathtub', 'Extra storage'],
  },
];

const FACILITIES = [
  { img: 'fac-pool', icon: IcPool, title: 'Outdoor pool', alt: 'Outdoor swimming pool framed by palms and tall residential towers', text: 'A palm-lined pool deck with loungers and towel service, open from early morning.' },
  { img: 'fac-dining', icon: IcDine, title: 'All-day dining', alt: 'Bright restaurant with arched glass roof, white columns and set tables', text: 'Breakfast, light lunches and dinner, with local favourites alongside international dishes.' },
  { img: 'fac-fitness', icon: IcGym, title: 'Fitness studio', alt: 'Hotel gym with treadmills and weight machines beside tall windows', text: 'Cardio and strength equipment beside full-height windows, open 24 hours.' },
  { img: 'fac-spa', icon: IcSpa, title: 'Spa treatment rooms', alt: 'Spa treatment room with a massage bed and soft lighting', text: 'Massages and treatments by appointment, arranged through the concierge.' },
  { img: 'fac-meet', icon: IcMeet, title: 'Meeting room', alt: 'Bright meeting room with a long table, chairs and a wall screen', text: 'A daylight boardroom for up to 12, with screen, video calls and refreshments by arrangement.' },
];
const SERVICES = [
  { icon: IcKey, label: '24-hour reception and concierge' },
  { icon: IcCar, label: 'Airport transfers on request' },
  { icon: IcWifi, label: 'Complimentary high-speed Wi-Fi' },
  { icon: IcShirt, label: 'Laundry and pressing' },
];

const GALLERY: (Shot & { cls?: string })[] = [
  { name: 'g7', alt: 'Singapore River skyline on a clear day with towers above the water', cap: 'The city by day (illustrative destination photo)', cls: 'w2' },
  { name: 'g1', alt: 'Long hotel lobby with marble floors, chandeliers and lounge seating', cap: 'Lobby lounge' },
  { name: 'g10', alt: 'Hotel room with a white bed, warm wood panels and a wide window', cap: 'Guest room', cls: 'tall' },
  { name: 'g2', alt: 'Double-height lobby with a glass chandelier, sofas and reception desks', cap: 'Reception and atrium', cls: 'w2' },
  { name: 'g6', alt: 'Quiet hotel corridor with soft lighting and white doors', cap: 'Guest corridor', cls: 'tall' },
  { name: 'g5', alt: 'Stone-tiled bathroom with a basin and walk-in shower', cap: 'Stone bathroom' },
  { name: 'g3', alt: 'King room with a tufted headboard, sofa and city window', cap: 'King room detail' },
  { name: 'g4', alt: 'Double vanity in dark marble with folded towels and amenities', cap: 'Marble vanity', cls: 'w2' },
  { name: 'g8', alt: 'Bowl of laksa with prawns, egg and herbs', cap: 'Local flavours: laksa', cls: 'w2' },
  { name: 'g9', alt: 'Dark-toned fitness room with treadmills facing a glass wall', cap: 'Evening workout' },
];

const FAQ = [
  { q: 'How do I book a room?', a: 'Message us on WhatsApp with your dates and number of guests. We reply with available room types and current rates, then confirm your booking in writing.' },
  { q: 'What are the check-in and check-out times?', a: 'Check-in is from 3:00 pm and check-out is until 12:00 pm. Early arrival or late departure can often be arranged; just ask when you enquire.' },
  { q: 'Can you arrange an airport transfer?', a: 'Yes. Private car transfers can be arranged on request. Share your flight details on WhatsApp and we will confirm the rate in advance.' },
  { q: 'Are children welcome?', a: 'Absolutely. Our Family Twin Room and Executive Suite suit families, and cots can be provided on request.' },
  { q: 'Is breakfast included?', a: 'Rates are offered both with and without breakfast. We will explain the options clearly before you confirm.' },
  { q: 'Is the hotel accessible?', a: 'Please tell us about any access needs when you enquire so we can recommend the most suitable room and arrange assistance.' },
];

function useScrolled() {
  const [s, set] = useState(false);
  useEffect(() => {
    const on = () => set(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return s;
}

function Logo() {
  return (
    <a href="#top" className="logo" aria-label={`${HOTEL}, back to top`}>
      <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3 6 29h3.6l2.2-6h8.4l2.2 6H26L16 3Zm-3 16.6L16 11l3 8.6h-6Z" fill="currentColor" /></svg>
      <span>Aurelle<small>House · Singapore</small></span>
    </a>
  );
}

export default function App() {
  const scrolled = useScrolled();
  const [menu, setMenu] = useState(false);
  const [lb, setLb] = useState<number | null>(null);
  const general = waUrl(generalMsg(HOTEL));
  // Close the menu first, then scroll once the page is scrollable again.
  const go = (e: MouseEvent, href: string) => {
    e.preventDefault();
    setMenu(false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      history.replaceState(null, '', href);
    }));
  };

  useEffect(() => {
    if (!menu) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', k);
    document.documentElement.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.documentElement.style.overflow = ''; };
  }, [menu]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`hdr${scrolled || menu ? ' solid' : ''}`}>
        <button className="menu-btn" type="button" aria-expanded={menu} aria-controls="menu" onClick={() => setMenu(!menu)}>
          <span className="burger" aria-hidden="true"><i /><i /></span><span className="menu-lbl">{menu ? 'Close' : 'Menu'}</span>
        </button>
        <nav className="dnav dnav-l" aria-label="Primary">{NAV.slice(0, 3).map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
        <Logo />
        <div className="hdr-r">
        <nav className="dnav dnav-r" aria-label="Secondary">{NAV.slice(3).map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
        <a className="hdr-wa" href={general} target="_blank" rel="noopener noreferrer" aria-label="Check availability on WhatsApp">
          <WaIcon size={18} /><span>Check availability</span>
        </a>
        </div>
      </header>
      <div id="menu" className={`menu${menu ? ' open' : ''}`} hidden={!menu}>
        <nav aria-label="Mobile">
          {NAV.map((n, i) => <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}><em>0{i + 1}</em>{n.label}</a>)}
        </nav>
        <a className="btn btn-gold" href={general} target="_blank" rel="noopener noreferrer"><WaIcon size={18} />Check Availability on WhatsApp</a>
        <p className="menu-note">WhatsApp {PHONE_DISPLAY}</p>
      </div>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-h">
          <HeroPic alt="King bed in a calm, softly lit hotel room with tall windows over the city (illustrative photo)" className="hero-img" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">Aurelle House · Singapore</p>
            <h1 id="hero-h">Quiet luxury, <em>above the city.</em></h1>
            <p className="hero-lead">Considered rooms, attentive service and a calm place to return to in the heart of Singapore.</p>
            <div className="hero-cta">
              <a className="btn btn-gold" href={general} target="_blank" rel="noopener noreferrer"><WaIcon size={18} />Check Availability on WhatsApp</a>
              <a className="btn btn-line" href="#rooms">Explore Rooms<IcArrow size={18} /></a>
            </div>
          </div>
          <p className="hero-tag">Fictional hotel concept · illustrative photography</p>
        </section>

        <section className="intro wrap" aria-labelledby="intro-h">
          <div className="intro-txt">
            <p className="kick">Welcome</p>
            <h2 id="intro-h">A city hotel that feels like a private residence.</h2>
            <p className="body">Aurelle House is a contemporary hotel concept for travellers who want the energy of Singapore outside and genuine calm inside. Warm materials, generous light and a small, attentive team shape every stay, whether you are here for three meetings or three slow days.</p>
            <ul className="intro-points">
              <li><IcCheck size={18} />Rooms designed around sleep and quiet</li>
              <li><IcCheck size={18} />Personal replies on WhatsApp, not a booking engine</li>
              <li><IcCheck size={18} />Thoughtful service for business and leisure stays</li>
            </ul>
          </div>
          <figure className="intro-img"><Pic name="intro" alt="Sweeping staircase with brass rails curving down into a warm-lit lobby" sizes="(min-width: 1024px) 40vw, 100vw" /></figure>
        </section>

        <section id="rooms" className="rooms" aria-labelledby="rooms-h">
          <div className="wrap">
            <div className="sec-head">
              <p className="kick">Stay</p>
              <h2 id="rooms-h">Rooms &amp; suites</h2>
              <p className="body">Four room types, each with its own character. Ask us on WhatsApp for current rates and availability for your dates.</p>
            </div>
            <div className="room-list">
              {ROOMS.map((r, i) => (
                <article className="room" key={r.id} aria-labelledby={`r-${r.id}`}>
                  <figure className="room-img"><Pic name={r.img} alt={r.alt} sizes="(min-width: 1024px) 55vw, 100vw" /></figure>
                  <div className="room-body">
                    <p className="room-no">0{i + 1}</p>
                    <h3 id={`r-${r.id}`}>{r.name}</h3>
                    <p>{r.text}</p>
                    <dl className="specs">
                      <div><dt><IcGuests size={18} />Guests</dt><dd>{r.guests}</dd></div>
                      <div><dt><IcBed size={18} />Bed</dt><dd>{r.bed}</dd></div>
                      <div><dt><IcSize size={18} />Size</dt><dd>{r.size}</dd></div>
                    </dl>
                    <ul className="amen">{r.amen.map((a) => <li key={a}>{a}</li>)}</ul>
                    <a className="btn btn-dark" href={waUrl(roomMsg(r.name, HOTEL))} target="_blank" rel="noopener noreferrer" aria-label={`Check availability for the ${r.name} on WhatsApp`}>
                      <WaIcon size={18} />Check Availability
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="facilities" className="fac" aria-labelledby="fac-h">
          <div className="wrap">
            <div className="sec-head light">
              <p className="kick">Facilities</p>
              <h2 id="fac-h">Everything you need, nothing you don&rsquo;t.</h2>
            </div>
            <div className="fac-grid">
              {FACILITIES.map((f, i) => (
                <article className={`fac-card${i === 0 ? ' big' : ''}`} key={f.title}>
                  <figure><Pic name={f.img} alt={f.alt} sizes={i === 0 ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'} /></figure>
                  <div><h3><f.icon size={20} />{f.title}</h3><p>{f.text}</p></div>
                </article>
              ))}
            </div>
            <ul className="svc">{SERVICES.map((s) => <li key={s.label}><s.icon size={20} />{s.label}</li>)}</ul>
          </div>
        </section>

        <section id="gallery" className="gal wrap" aria-labelledby="gal-h">
          <div className="sec-head">
            <p className="kick">Gallery</p>
            <h2 id="gal-h">A closer look</h2>
            <p className="body">Tap any photograph to view it full screen. Photographs are illustrative of the style of the hotel concept.</p>
          </div>
          <ul className="gal-grid">
            {GALLERY.map((g, i) => (
              <li key={g.name} className={g.cls}>
                <button type="button" onClick={() => setLb(i)} aria-label={`Open photo ${i + 1} of ${GALLERY.length}: ${g.cap}`}>
                  <Pic name={g.name} alt="" sizes="(min-width: 1024px) 33vw, 50vw" />
                  <span className="gal-cap">{g.cap}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
        <Lightbox shots={GALLERY} index={lb} onIndex={setLb} label="Photo gallery" />

        <section id="location" className="loc" aria-labelledby="loc-h">
          <div className="wrap loc-in">
            <div>
              <p className="kick">Location</p>
              <h2 id="loc-h">In the heart of the city</h2>
              <p className="body">Aurelle House is imagined in Singapore&rsquo;s Downtown Core, close to the city&rsquo;s business district and waterfront. For this demonstration the address below is a sample; a real property would list verified travel times here.</p>
              <p className="loc-addr"><IcPin size={20} /><span><strong>Sample address</strong><br />Downtown Core, Singapore (demonstration only)</span></p>
              <p className="loc-note">Arrival tips, directions and transfer options are shared on WhatsApp once you enquire.</p>
              <a className="btn btn-dark" href={general} target="_blank" rel="noopener noreferrer"><WaIcon size={18} />Ask about getting here</a>
            </div>
            <div className="map" role="img" aria-label="Map placeholder for a sample location in Downtown Core, Singapore">
              <MapPlaceholder label="Map placeholder" colors={{ land: '#e9e2d3', water: '#c9d3cc', road: '#fbf8f2', park: '#cbd5c2', pin: '#1d3b30' }} />
              <div className="map-card"><IcPin size={22} /><span><strong>Map placeholder</strong>Sample location · Downtown Core</span></div>
            </div>
          </div>
        </section>

        <section className="trust wrap" aria-labelledby="trust-h">
          <div className="sec-head">
            <p className="kick">Our commitments</p>
            <h2 id="trust-h">How we look after you</h2>
          </div>
          <ul className="promise">
            <li><IcChat size={24} /><h3>A real reply</h3><p>Every enquiry is answered by our reservations team, with clear rates before you commit.</p></li>
            <li><IcClock size={24} /><h3>Flexible timing</h3><p>We do our best to accommodate early arrivals and late departures.</p></li>
            <li><IcShield size={24} /><h3>Privacy and discretion</h3><p>Your details are used only to arrange your stay.</p></li>
          </ul>
          <div className="quotes">
            {[
              { q: 'The room was quiet enough to sleep off a long-haul flight, and the team sorted our transfer within minutes on WhatsApp.', w: 'Sample guest, business trip' },
              { q: 'Calm, beautifully kept and very easy to arrange. It felt more like staying with friends than at a big hotel.', w: 'Sample guest, family stay' },
            ].map((t) => (
              <figure key={t.w}><blockquote>&ldquo;{t.q}&rdquo;</blockquote><figcaption>{t.w}</figcaption></figure>
            ))}
            <p className="quotes-note">Testimonials are fictional samples written to show the layout. They are not real guest reviews.</p>
          </div>
        </section>

        <section className="faq wrap" aria-labelledby="faq-h">
          <div className="sec-head">
            <p className="kick">FAQ</p>
            <h2 id="faq-h">Good to know</h2>
          </div>
          <div className="faq-list">
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}<IcPlus size={20} /></summary><p>{f.a}</p></details>
            ))}
          </div>
        </section>

        <section className="cta" aria-labelledby="cta-h">
          <div className="wrap">
            <h2 id="cta-h">Plan your stay with a person, not a form.</h2>
            <p>Send your dates on WhatsApp and we will reply with rooms, rates and availability.</p>
            <a className="btn btn-gold" href={general} target="_blank" rel="noopener noreferrer"><WaIcon size={18} />Check Availability on WhatsApp</a>
          </div>
        </section>
      </main>

      <footer id="contact" className="ftr">
        <div className="wrap ftr-in">
          <div className="ftr-brand"><Logo /><p>A fictional contemporary hotel concept created for demonstration. Not a real hotel; no bookings are taken.</p></div>
          <div>
            <h2 className="ftr-h">Contact</h2>
            <ul className="ftr-list">
              <li><WaIcon size={18} /><a href={general} target="_blank" rel="noopener noreferrer">WhatsApp {PHONE_DISPLAY}</a></li>
              <li><IcPhone size={18} /><a href={TEL}>{PHONE_DISPLAY}</a></li>
              <li><IcMail size={18} /><span>hello@aurellehouse.example <small>(demo address)</small></span></li>
              <li><IcPin size={18} /><span>Sample address: Downtown Core, Singapore</span></li>
            </ul>
          </div>
          <div>
            <h2 className="ftr-h">Explore</h2>
            <ul className="ftr-nav">{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
          </div>
        </div>
        <div className="wrap">
          <details className="credits">
            <summary>Photo credits</summary>
            <p>All photographs are illustrative, sourced from Wikimedia Commons under free licences, and do not show this fictional hotel.</p>
            <ol>
              {CREDITS.map((c) => <li key={c.name}><a href={c.page} target="_blank" rel="noopener noreferrer">{c.title}</a> by {c.artist}, {c.lic}</li>)}
            </ol>
          </details>
          <p className="copy">© 2026 Aurelle House Singapore. Fictional hotel concept for demonstration.</p>
        </div>
      </footer>

      <a className="wa-dock" href={general} target="_blank" rel="noopener noreferrer"><WaIcon size={20} />Check Availability on WhatsApp</a>
    </>
  );
}
