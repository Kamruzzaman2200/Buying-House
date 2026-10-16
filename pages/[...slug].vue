<script setup lang="ts">
import { createError } from '#app'

throw createError({
  statusCode: 404,
  statusMessage: 'Pattern Specification Not Found in Production Archive.',
  fatal: true,
})
</script>

<template>
  <div />
</template>
