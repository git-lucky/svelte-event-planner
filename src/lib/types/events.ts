import type { Event } from "$lib/server/remote-events";

export type EventClickHandler = (detail: { eventId: number; originalEvent: MouseEvent }) => void;
