<template>
    <main class="main">
        <Header />
        <Archive />
    </main>
</template>

<script>
import Header from '@/components/Header'
import Archive from '@/components/Archive'

export default {
    name: 'History',
    components: {
        Archive,
        Header
    }
}
</script>