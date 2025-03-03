<script lang="ts">
	import type { PageData } from "./$types";
    import { goto } from '$app/navigation';
    import BackButton from '$lib/components/BackButton.svelte';
    import EventDetails from '$lib/components/EventDetails.svelte';
    import EventNotFound from '$lib/components/EventNotFound.svelte';
    import DeleteEventModal from '$lib/components/DeleteEventModal.svelte';

    interface Props {
        data: PageData
    }

    let {data}: Props = $props();
    let isEditLoading = $state(false);
    let showDeleteModal = $state(false);
    
    async function handleEditClick(eventId: number): Promise<void> {
        isEditLoading = true;
        try {
            await goto(`/edit/${eventId}`);
        } catch (error) {
            console.error("Navigation error:", error);
            isEditLoading = false;
        }
    }

    function handleDeleteClick(): void {
        showDeleteModal = true;
    }

    function handleDeleted(): void {
        goto('/');
    }
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
    <BackButton href="/" label="Back to events" />

    {#if data.event}
        <EventDetails 
            event={data.event}
            {isEditLoading}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
        />
    {:else}
        <EventNotFound />
    {/if}
</div>

<DeleteEventModal 
    isOpen={showDeleteModal}
    eventTitle={data.event?.title ?? ''}
    close={() => showDeleteModal = false}
    deleted={handleDeleted}
/>