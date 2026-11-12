import { wedding } from "../../../config/wedding";
import { calendar, events } from "../../../lib/wedding";

export function generateStaticParams() {
  return events.map((event) => ({ file: `${event.id}-${wedding.year}.ics` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const event = events.find((entry) => file === `${entry.id}-${wedding.year}.ics`);
  const invitation = event && calendar(event);
  if (!invitation) return new Response("Calendar event not found", { status: 404 });
  return new Response(invitation, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${file}"`,
    },
  });
}
