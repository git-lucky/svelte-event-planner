<script lang="ts">
    import type { Event } from "$lib/server/remote-events";
    import { formatTime, getDayOfWeek, getDayNumber } from "$lib/utils/dateUtils";
    import LoadingSpinner from "./LoadingSpinner.svelte";
    
    type EventClickDetail = { eventId: number, originalEvent: MouseEvent };

    interface Props {
        event: Event;
        isLoading?: boolean;
        isToday?: boolean;
        onEventClick?: (detail: EventClickDetail) => void;
    }
    
    let { 
        event, 
        isLoading = false, 
        isToday = false,
        onEventClick = undefined 
    }: Props = $props();
    
    const eventDate = new Date(event.date);
    
    const time = formatTime(event.date);
    const dayOfWeek = isToday ? null : getDayOfWeek(eventDate);
    const dayNumber = isToday ? null : getDayNumber(eventDate);
    
    function handleClick(e: MouseEvent) {
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
            e.preventDefault();
            if (onEventClick) {
                onEventClick({ eventId: event.id, originalEvent: e });
            }
        }
    }
</script>

{#if isToday}
    <!-- Today's event card design -->
    <a href="/{event.id}" class="block" onclick={handleClick}>
        <div class="bg-sky-500 text-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 
                   transform hover:-translate-y-[2px] relative border border-sky-600">
            
            {#if isLoading}
            <div class="absolute inset-0 bg-black bg-opacity-60 rounded-lg z-20 flex items-center justify-center" 
                 aria-live="polite" aria-busy={isLoading}>
                <LoadingSpinner size="lg" color="text-white" />
            </div>
            {/if}
            
            <div class="flex justify-between">
                <h3 class="text-xl font-bold">{event.title}</h3>
            </div>
            <p class="text-lg mt-1">{time}</p>
            {#if event.description}
                <p class="mt-2 text-white text-opacity-90 line-clamp-2">{event.description}</p>
            {/if}
        </div>
    </a>
{:else}
    <!-- Upcoming event card design -->
    <a href="/{event.id}" class="block" onclick={handleClick}>
        <div class="flex md:block md:rounded-lg md:overflow-hidden md:bg-white 
                    transition-all duration-200 md:shadow-md md:hover:shadow-lg 
                    transform hover:-translate-y-[2px] relative">
            
            {#if isLoading}
            <div class="absolute inset-0 bg-black bg-opacity-60 rounded-lg md:rounded-none z-20 flex items-center justify-center" 
                 aria-live="polite" aria-busy={isLoading}>
                <LoadingSpinner size="lg" color="text-white" />
            </div>
            {/if}
            
            <!-- Day indicator - side on mobile, top on desktop -->
            <div class="w-14 mr-2 flex flex-col items-center justify-center text-blue-600
                        md:w-full md:mr-0 md:py-3 md:bg-blue-100 md:border-b md:border-blue-200 
                            md:shadow-sm md:relative md:z-10">
                <div class="text-sm font-bold md:text-center">{dayOfWeek}</div>
                <div class="text-2xl font-bold md:text-center">{dayNumber}</div>
            </div>
            
            <!-- Event card -->
            <div class="flex-1 bg-blue-800 text-white rounded-lg p-4 shadow-md
                        md:rounded-none md:shadow-none md:flex md:flex-col md:justify-between md:h-[calc(100%-3rem)]">
                <div>
                    <div class="flex justify-between">
                        <h3 class="text-xl font-bold">{event.title}</h3>
                    </div>
                    <p class="text-lg mt-1">{time}</p>
                    {#if event.description}
                        <p class="mt-2 text-white text-opacity-90 line-clamp-2">{event.description}</p>
                    {/if}
                </div>
            </div>
        </div>
    </a>
{/if} 