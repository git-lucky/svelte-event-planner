<script lang="ts">
    interface Props {
        title?: string;
        message: string;
    }

    let { title = "Error loading events", message = "" }: Props = $props();
</script>

<div class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded my-6" role="alert">
    <div class="flex">
        <svg class="h-6 w-6 text-red-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <div>
            <p class="font-medium">{title}</p>
            <p class="text-sm">{message}</p>
        </div>
    </div>
</div> 