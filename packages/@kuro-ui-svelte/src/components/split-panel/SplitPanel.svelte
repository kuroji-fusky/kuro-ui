<script lang="ts">
  export let windowBreakpoint = "768px"
  export let containerBreakpoint = ""
  export let shelfMinWidth = "300px"
</script>

<div>
  <div>
    <slot name="shelf" />
  </div>

  <div>
    <slot />
  </div>
</div>
