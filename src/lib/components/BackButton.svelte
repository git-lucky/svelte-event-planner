<script lang="ts">
    interface Props {
        href?: string;
        label?: string;
    }

    let { 
        href = "/", 
        label = "Back" 
    }: Props = $props();
</script>

<a {href} class="text-blue-600 hover:text-blue-800 inline-flex items-center mb-6" aria-label={label}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
    </svg>
    {label}
</a> 