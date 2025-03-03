<script lang="ts" module>
    export type EventFormData = {
        success: boolean;
        eventId: number;
    };

    export type EventFormError = {
        error: string;
        title?: string;
        description?: string;
        date?: string;
    };
</script>

<script lang="ts">
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';
    import { getTodayForInput, validateEventDate } from '$lib/utils/dateUtils';
    import ErrorAlert from './ErrorAlert.svelte';

    interface Props {
        title?: string;
        description?: string;
        date?: string;
        formError?: string;
        submitLabel?: string;
        onSuccess?: (detail: { eventId: number }) => void;
    }

    let { 
        title = '', 
        description = '', 
        date = '', 
        formError = undefined,
        submitLabel = 'Save',
        onSuccess = undefined,
    }: Props = $props();

    let submitting = $state(false);
    let dateError = $state('');
    const minDate = getTodayForInput();

    function handleDateChange(e: Event): void {
        const input = e.target as HTMLInputElement;
        date = input.value;
        dateError = validateEventDate(date);
    }

    const submitForm: SubmitFunction<EventFormData, EventFormError> = () => {
        submitting = true;
        return async ({ result }) => {
            if (result.type === 'success' && result.data) {
                if (result.data.success && result.data.eventId) {
                    if (onSuccess) {
                        onSuccess({ eventId: result.data.eventId });
                    }
                    return;
                }
            }
            submitting = false;
        };
    };
</script>

<div class="bg-white rounded-lg shadow-md p-6">
    {#if formError}
        <div class="mb-6">
            <ErrorAlert message={formError} />
        </div>
    {/if}
    
    <form method="POST" use:enhance={submitForm}>
        <div class="space-y-6">
            <div>
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Event Title <span class="text-red-500">*</span></label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    required
                    bind:value={title}
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter event title"
                >
            </div>
            
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                    id="description" 
                    name="description" 
                    rows="4"
                    bind:value={description}
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add event details (optional)"
                ></textarea>
            </div>
            
            <div>
                <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Event Date and Time <span class="text-red-500">*</span></label>
                <input 
                    type="datetime-local" 
                    id="date" 
                    name="date" 
                    min={minDate}
                    required
                    bind:value={date}
                    onchange={handleDateChange}
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                {#if dateError}
                    <p class="mt-1 text-sm text-red-600">{dateError}</p>
                {/if}
            </div>
            
            <div class="flex justify-end">
                <button 
                    type="submit" 
                    disabled={submitting || dateError !== ''}
                    class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-busy={submitting}
                >
                    {#if submitting}
                        <div class="flex items-center">
                            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {submitLabel}...
                        </div>
                    {:else}
                        {submitLabel}
                    {/if}
                </button>
            </div>
        </div>
    </form>
</div> 