<script lang="ts">
    interface Props {
        description: string | null | undefined;
    }

    let { description }: Props = $props();
</script>

{#if description}
    <div class="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 class="text-lg font-medium text-gray-700 mb-2">Description</h2>
        <p class="text-gray-700 whitespace-pre-line">{description}</p>
    </div>
{/if} 