<template>
    <section class="showMedical" style="height:100%;animation: protocolShow 0.3s forwards;
    overflow:auto;
    -webkit-overflow-scrolling: touch;background-color: #ffffff">
        <div style="width:100%;height:4rem;">
            <div style="width:100%;height:3.85rem;background-color: #ffffff">
                <mt-swipe :auto="0">
                    <mt-swipe-item v-for="(item,index) in medicalDetailInfo.images">
                        <div class="imgWrap" style="height:100%;border:none">
                        <img :src="item.url" style="width:100%;height: 100% "/>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <div style="height: 8.2rem;margin-top:7px;">
            <table style="width: 95%;margin: 0 11px;" cellpadding="0" cellspacing="0">
                <tr style="width:100%" v-for="(dataItem,idx) in medicalDetailInfo.spec.items">
                    <td style="width:100%;padding:.2rem 0;">
                        <span style="display: inline-block;width: 2rem;vertical-align: top">{{dataItem.title}}</span>
                        <span style="display: inline-block;width: 4.8rem;white-space: pre-wrap;vertical-align: top">{{dataItem.text}}</span></td>
                </tr>
            </table>
        </div>
    </section>
</template>
<script>
    import $ from 'jquery'
    import {mapState} from 'vuex'
    import TopNav from '../title/index.vue'
    import '../../css/showMedicalInfo.css'

    export default {
        name: 'ShowMedicalInfo',
        components: {TopNav},
        data() {
            return {}
        },
        created() {
        },
        computed: {
            ...mapState(['medicalDetailInfo']),
        },
        watch: {},
        methods: {}
    }

</script>