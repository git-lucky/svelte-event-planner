<script lang="ts">
    import LoadingSpinner from "./LoadingSpinner.svelte";

    interface Props {
        message?: string;
    }

    let { message = "Loading events..." }: Props = $props();
</script>

<div class="my-8 flex justify-center">
    <div class="text-center">
        <div class="flex items-center justify-center mb-4">
            <LoadingSpinner size="md" color="text-blue-500" />
        </div>
        <p class="text-center text-gray-600">{message}</p>
    </div>
</div> 