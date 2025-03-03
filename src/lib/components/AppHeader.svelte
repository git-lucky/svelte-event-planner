<script lang="ts">
    interface Props {
        title?: string;
    }

    let { title = "Event Planner" }: Props = $props();
</script>

<header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm px-3 py-4 sm:px-4 md:px-6">
    <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900 md:text-4xl">{title}</h1>
        <a 
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg
                   flex items-center transition-colors duration-200 shadow-sm hover:shadow"
            href="/newevent" 
            role="button"
            aria-label="Add a new event"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add Event
        </a>
    </div>
</header> 