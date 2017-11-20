<!--<style src="../../css/report.css"></style>-->
<template>
    <div>
        <div style="margin-top: 40%;margin-left: 23%;">
            <img src="../../images/noMedication.png" alt="">
            <div style="color:#F58B23;width: 3rem;margin-left: 15px;">药品方案正在建设中…</div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import '../../css/noMedication.css'
    import TopNav from '../title/index.vue'

    export default {
        name: 'NoMedication',
        components: {TopNav},
        data() {
            return {}
        },
        computed: {},
        watch: {},
        beforeCreate() {
        },
        created() {
        },
        mounted() {

        },
        methods: {}
    }
</script>
