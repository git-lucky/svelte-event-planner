<script lang="ts">
    interface Props {
        message?: string;
    }

    let { message = "Create your first event to get started" }: Props = $props();
</script>

<div class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center my-8">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <p class="text-gray-600 text-lg">No events found</p>
    <p class="text-gray-500 mt-1">{message}</p>
</div> 