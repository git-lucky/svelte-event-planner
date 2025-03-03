<script lang="ts">
	import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import { organizeEvents } from "$lib/utils/eventUtils";
    import AppHeader from "$lib/components/AppHeader.svelte";
    import EmptyEventsList from "$lib/components/EmptyEventsList.svelte";
    import EventsLoading from "$lib/components/EventsLoading.svelte";
    import ErrorDisplay from "$lib/components/ErrorDisplay.svelte";
    import TodayEventsList from "$lib/components/TodayEventsList.svelte";
    import UpcomingEventsList from "$lib/components/UpcomingEventsList.svelte";

    interface Props {
        data: PageData;
    }

    let {data}: Props = $props();
    
    let loadingEventId = $state<number | null>(null);
    
    async function handleEventClick(detail: { eventId: number, originalEvent: MouseEvent }) {
        const { eventId } = detail;
        loadingEventId = eventId;
        
        try {
            await goto(`/${eventId}`);
        } catch (error) {
            loadingEventId = null;
        }
    }
</script>

<div class="mx-auto bg-gray-50 min-h-screen w-full flex flex-col
            max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">

    <AppHeader />

    <div class="flex-1 px-3 py-6 sm:px-4 md:px-6 md:py-8">
        {#await data.events}
            <EventsLoading />
        {:then events}
            {#if events.length === 0}
                <EmptyEventsList />
            {:else}
                {@const organized = organizeEvents(events)}
                <div class="md:flex md:gap-6 md:h-[calc(100vh-9rem)]">
                    <TodayEventsList 
                        events={organized.todaysEvents}
                        {loadingEventId}
                        onEventClick={handleEventClick}
                    />
                    <UpcomingEventsList 
                        groupedEvents={organized.groupedUpcoming}
                        {loadingEventId}
                        onEventClick={handleEventClick}
                    />
                </div>
            {/if}
        {:catch error}
            <ErrorDisplay message={error.message} />
        {/await}
    </div>
</div>