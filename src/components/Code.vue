<template>
    <div class="codes-capsule" @click="$emit('copyPromo', code)">
        <p class="codes-code">{{code.promo}}</p>
    </div>
</template>

<script>
    export default {
        name: 'Code',
        props: {
            code: {
                type: Object,
                required: true
            }
        }
    }
</script>