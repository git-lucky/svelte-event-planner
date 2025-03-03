<script lang="ts">
    import type { Event } from "$lib/server/remote-events";
    import SectionHeader from "./SectionHeader.svelte";
    import MonthHeader from "./MonthHeader.svelte";
    import EventCard from "./EventCard.svelte";
	import type { EventClickHandler } from "$lib/types/events";
    
    interface Props {
        groupedEvents: Record<string, Event[]>;
        loadingEventId: number | null;
        onEventClick?: EventClickHandler;
    }
    
    let { 
        groupedEvents = {}, 
        loadingEventId = null,
        onEventClick = undefined
    }: Props = $props();

    const typedEntries = $derived(Object.entries(groupedEvents).map(
        ([month, events]): [string, Event[]] => [month, events as Event[]]
    ));
</script>

<div class="md:flex-[2] md:flex md:flex-col">
    <SectionHeader title="Upcoming Events" />
    <div class="overflow-y-auto pr-1 flex-1 max-h-[60vh] md:max-h-none">
        {#if Object.keys(groupedEvents).length > 0}
            <div class="space-y-6">
                {#each typedEntries as [monthYear, events]}
                    <div class="mb-2">
                        <MonthHeader {monthYear} />
                        <div class="space-y-2 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 mt-3">
                            {#each events as event}
                                <EventCard 
                                    {event}
                                    isToday={false}
                                    isLoading={loadingEventId === event.id}
                                    {onEventClick}
                                />
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <p class="text-gray-500 italic">No upcoming events scheduled</p>
        {/if}
    </div>
</div>