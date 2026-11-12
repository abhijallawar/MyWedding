import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarPlus, MapPin } from "lucide-react";
import { wedding } from "../config/wedding";
import { ceremony, ceremonyDate, dateLabel, eventDate, eventVenue, events, timeLabel } from "../lib/wedding";
import { Flourish, Lotus, Motif } from "../components/ornaments";
import SceneMotion from "../components/scene-motion";
import Countdown from "../components/countdown";
import CouplePortrait from "../components/couple-portrait";
import InvitationEntrance from "../components/invitation-entrance";

const [first, second] = wedding.names;
const fullDate = dateLabel(ceremony);
const weddingTime = timeLabel(ceremony);
const dateCaption = `${fullDate}, ${weddingTime}`;

function Directions({ href, label }: { href: string; label: string }) {
  return <a className="text-action" href={href} target="_blank" rel="noopener noreferrer"
    aria-label={`Directions for ${label} (opens in a new tab)`}>
    <ArrowUpRight size={16} aria-hidden="true"/> Directions
  </a>;
}

function FloralCorners() {
  return (["left", "right"] as const).map((side) => (
    <div key={side} className={`frame-corner frame-corner-${side}`}>
      <Image src="/art/floral-frame.webp" alt="" width={1536} height={1024}
        quality={85} sizes="(max-width: 540px) 143vw, 118vw"/>
    </div>
  ));
}

export default function Invitation() {
  return <InvitationEntrance soundtrack={wedding.music.src}>
    <SceneMotion>
    <a href="#main" className="skip-link">Skip to invitation</a>
    <main id="main" tabIndex={-1}>
      <section className="hero isolate relative text-center" aria-labelledby="couple">
        <div className="hero-stage" aria-hidden="true">
          <div className="scene-sky" data-layer="sky"><Image src="/art/mountains.webp" alt="" fill loading="eager" sizes="100vw"/></div>
          <div className="scene-foliage" data-layer="foliage"><Image src="/art/foliage.svg" alt="" fill unoptimized sizes="100vw"/></div>
          <div className="scene-temple" data-layer="temple">
            <Image src="/art/temple.webp" alt="" fill preload quality={85} sizes="(max-width: 767px) 108vw, (max-width: 1200px) 82vw, 990px"/>
          </div>
          <div className="scene-mist" data-layer="mist"><div className="mist-drift"/></div>
          <div className="scene-flowers" data-layer="flowers">
            <Image className="frame-wide" src="/art/floral-frame.webp" alt="" fill quality={85} sizes="102vw"/>
            <div className="frame-phone frame-phone-top"><FloralCorners/></div>
          </div>
        </div>
        <div className="frame-phone frame-phone-bottom" aria-hidden="true"><FloralCorners/></div>
        <div className="hero-title relative mx-auto">
          <Flourish/>
          <p className="eyebrow">{wedding.copy.welcome}</p>
          <h1 id="couple"><span>{first}</span><span className="weds">weds</span><span>{second}</span></h1>
          <p className="hero-date">{fullDate}<span aria-hidden="true"> · </span>{weddingTime}</p>
        </div>
        <a className="scroll-cue" href="#welcome"><span>Continue to the invitation</span><ArrowDown size={17} aria-hidden="true"/></a>
      </section>

      <section className="welcome chapter text-center relative isolate" id="welcome" aria-labelledby="welcome-title">
        <Image src="/art/sprig.svg" className="welcome-sprig welcome-sprig-left" alt="" width={350} height={350} unoptimized/>
        <Image src="/art/sprig.svg" className="welcome-sprig welcome-sprig-right" alt="" width={350} height={350} unoptimized/>
        <div className="welcome-layout mx-auto">
          <CouplePortrait/>
          <div className="welcome-copy" data-reveal>
            <Flourish/>
            <h2 id="welcome-title">With love and blessings</h2>
            <p className="section-copy">{wedding.copy.invitation}</p>
            {wedding.optional.blessing && <p className="section-copy">{wedding.optional.blessing}</p>}
            {wedding.optional.familyCopy && <p className="section-copy">{wedding.optional.familyCopy}</p>}
            {wedding.optional.portraits && <div className="portraits">{wedding.optional.portraits.map((portrait: { src: string; alt: string }) =>
              <Image key={portrait.src} src={portrait.src} alt={portrait.alt} width={240} height={300}/>)}</div>}
            <a className="welcome-action" href="#events">Explore the celebrations <ArrowDown size={16} aria-hidden="true"/></a>
          </div>
        </div>
      </section>

      <section className="events chapter" id="events" aria-labelledby="events-title">
        <div className="chapter-intro mx-auto text-center" data-reveal>
          <Flourish/>
          <h2 id="events-title">The celebrations</h2>
        </div>
        <ol className="timeline mx-auto">
          {events.map((event) => {
            const venue = eventVenue(event);
            const start = eventDate(event);
            return <li key={event.id} className={`event event-${event.id}`} data-reveal>
              <div className="event-art"><Motif kind={event.id}/></div>
              <div className="event-detail">
                <h3>{event.name}</h3>
                <p className="event-date"><time dateTime={Number.isFinite(start) ? new Date(start).toISOString() : undefined}>{dateLabel(event, true)} <span>·</span> {timeLabel(event)}</time></p>
                <p className="event-location"><MapPin size={15} aria-hidden="true"/><span>{venue.name}
                  {venue.locality && <small>{venue.locality}</small>}{venue.address && venue.address !== venue.name && <small>{venue.address}</small>}
                </span></p>
                {"line" in event && <p className="event-copy">{event.line}</p>}
                <div className="flex flex-wrap items-center event-actions">
                  <Directions href={venue.directions} label={event.name}/>
                  {Number.isFinite(start) && <a className="text-action" href={`/calendar/${event.id}-${wedding.year}.ics`}
                    download={`${event.id}-${wedding.year}.ics`} aria-label={`Add ${event.name} to calendar`}><CalendarPlus size={16} aria-hidden="true"/> Add to calendar</a>}
                </div>
              </div>
            </li>;
          })}
        </ol>
      </section>

      <section className="countdown chapter text-center relative isolate" id="countdown" aria-labelledby="countdown-title">
        <Image src="/art/sprig.svg" className="count-sprig count-sprig-left" alt="" width={350} height={350} unoptimized/>
        <Image src="/art/sprig.svg" className="count-sprig count-sprig-right" alt="" width={350} height={350} unoptimized/>
        <div className="count-frame mx-auto relative" data-reveal>
          <Flourish/>
          <h2 id="countdown-title">Counting down to forever</h2>
          <Countdown target={Number.isFinite(ceremonyDate) ? ceremonyDate : null} date={dateCaption} started={wedding.copy.started}/>
          {Number.isFinite(ceremonyDate) && <p className="count-date"><time dateTime={new Date(ceremonyDate).toISOString()}>{dateCaption}</time></p>}
        </div>
      </section>
    </main>
    <footer className="farewell chapter text-center">
      <div className="copy-column mx-auto" data-reveal>
        <Lotus className="footer-lotus"/>
        <p className="eyebrow">With all our love</p>
        <p className="closing-copy">{wedding.copy.farewell}</p>
        <div className="footer-monogram" aria-label={wedding.monogram}>{wedding.monogram}</div>
        <p className="footer-names">{wedding.names.join(" weds ")}</p>
        <a className="text-action" href="#events">Back to the celebrations <ArrowRight size={16} aria-hidden="true"/></a>
      </div>
    </footer>
    </SceneMotion>
  </InvitationEntrance>;
}
