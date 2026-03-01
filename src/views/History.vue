<template>
    <main class="main">
        <Header />
        <Archive />
    </main>
</template>

<script>
import Header from '@/components/Header.vue'
import Archive from '@/components/Archive.vue'

export default {
    name: 'History',
    components: {
        Archive,
        Header
    }
}
</script>