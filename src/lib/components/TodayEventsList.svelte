<script lang="ts">
    import type { Event } from "$lib/server/remote-events";
    import SectionHeader from "./SectionHeader.svelte";
    import EventCard from "./EventCard.svelte";
	import type { EventClickHandler } from "$lib/types/events";
    
    interface Props {
        events: Event[];
        loadingEventId: number | null;
        onEventClick?: EventClickHandler;
    }
    
    let { 
        events = [], 
        loadingEventId = null,
        onEventClick = undefined
    }: Props = $props();
</script>

<div class="mb-8 md:mb-0 md:flex-1 md:flex md:flex-col">
    <SectionHeader title="Today's Events" />
    <div class="overflow-y-auto pr-1 flex-1 max-h-[50vh] md:max-h-none">
        {#if events.length > 0}
            <div class="space-y-2">
                {#each events as event}
                    <EventCard 
                        {event}
                        isToday={true}
                        isLoading={loadingEventId === event.id}
                        onEventClick={onEventClick}
                    />
                {/each}
            </div>
        {:else}
            <p class="text-gray-500 italic">No events scheduled for today</p>
        {/if}
    </div>
</div> 