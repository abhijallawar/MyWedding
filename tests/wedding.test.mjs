import assert from "node:assert/strict";
import { test } from "node:test";
import { wedding } from "../config/wedding.ts";
import { calendar, ceremony, ceremonyDate, countdown, dateLabel, eventDate, events, timeLabel } from "../lib/wedding.ts";

test("all four event starts match the supplied IST times and calendar downloads", () => {
  const expected = [
    ["haldi", "2026-12-11T06:30:00Z", "12:00 pm"],
    ["sangeet", "2026-12-11T14:00:00Z", "7:30 pm"],
    ["wedding", "2026-12-12T06:37:00Z", "12:07 pm"],
    ["reception", "2026-12-13T13:30:00Z", "7:00 pm"],
  ];
  assert.deepEqual(events.map(({ id }) => id), expected.map(([id]) => id));
  for (const [index, [, iso, display]] of expected.entries()) {
    const event = events[index];
    assert.equal(eventDate(event), Date.parse(iso));
    assert.equal(timeLabel(event), display);
    const invite = calendar(event).replace(/\r\n /g, "");
    assert.ok(invite.includes(`DTSTART:${iso.replace(/[-:]/g, "")}\r\n`));
    assert.ok(invite.includes(`URL:${wedding.venues[event.venue].directions}\r\n`));
  }
});

test("changing the year propagates to the start timestamp, displayed date and calendar", () => {
  assert.equal(dateLabel(ceremony, true, 2027), "Sunday, 12 December 2027");
  assert.equal(eventDate(ceremony, 2027), Date.parse("2027-12-12T12:07:00+05:30"));
  assert.match(calendar(ceremony, 2027), /DTSTART:20271212T063700Z/);
  assert.match(calendar(ceremony, 2027), /UID:wedding-2027@/);
});

test("the countdown handles elapsed time, the exact instant and invalid dates", () => {
  assert.equal(ceremonyDate, Date.parse("2026-12-12T12:07:00+05:30"));
  assert.deepEqual(countdown(ceremonyDate, ceremonyDate - 90_061_000), { ended: false, units: [1, 1, 1, 1] });
  assert.deepEqual(countdown(ceremonyDate, ceremonyDate - 1), { ended: false, units: [0, 0, 0, 1] });
  for (const now of [ceremonyDate, ceremonyDate + 1000]) assert.deepEqual(countdown(ceremonyDate, now), { ended: true, units: [0, 0, 0, 0] });
  assert.equal(countdown(NaN, Date.now()), null);
  assert.equal(calendar({ ...ceremony, day: 32 }), null);
});

test("the supplied directions remain distinct and only known addresses can be copied", () => {
  assert.deepEqual(Object.values(wedding.venues).map((venue) => venue.directions), [
    "https://maps.app.goo.gl/9a8JMo26DyrvSDoZ8",
    "https://maps.app.goo.gl/uqsHPUvWJAgitZ7t5",
    "https://maps.app.goo.gl/KD9eEKvNETC8Y5VK6",
  ]);
  assert.equal(wedding.venues.sindewahi.address, null);
  for (const event of events.filter(({ venue }) => venue === "sindewahi")) {
    assert.match(calendar(event), /^LOCATION:Jallawar Residency\\,/m);
  }
  assert.equal(wedding.venues.wedding.name, "Jijau Lawn · Datala Rd, Chandrapur MH.");
});
