<template>
    <div id="symptomFooter">
        <div class="clearfix scrollV" :style="{height:scrollH,bottom:scrollBot}">
            <div class="choice fll" @click="deleteChoice(item)" v-for="(item,index) in selected"
                 :key="index" data-idx="index">
                <span class='fll' style="display: inline-block;margin-right: .10rem;">{{item.text}}</span>
                <span class="flr icon common icon-qingchu" style="margin-top: .20rem;"></span>
            </div>
        </div>
        <div class="sure footer-area" :class="{disabled:selected.length==0}" @click="clickSure">
            <div class='is-agree'>
                完成(
                <span>{{selected.length}}</span> 个症状)
            </div>

            <div class='imgWrap'>
                <img src='../../images/btnBg.jpg'/>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../css/inquiry.css'
    import {MessageBox} from 'mint-ui';
    import $ from 'jquery'
    import {mapState} from 'vuex'

    export default {
        name: 'Cart',
        computed: {
            ...mapState(['options']),
        },
        methods: {
            deleteChoice(item) {
                this.$store.dispatch('setSymptomChoice', item)
            },
            clickSure() {
                let self = this;
                this.$store.dispatch('flagSetToInquiry', true);
                if (this.selected.length > 0) {
                    this.$store.dispatch('symptomRecordAnswer',
                        {
                            vData: this.selected,
                            cb: function (params) {
                                self.$store.dispatch('recordUserInp',
                                    [{value: params.answer, type: 'text'}]);
                                self.$store.dispatch('fetchFooterInfo', {
                                    value: params.answer, type: 'symptomList'
                                });
                                setTimeout(function () {
                                    self.$router.push({path: '/inquiry', query: {from: 'symptoms'}});
                                }, 400)
                            }
                        })

                }
                else {
                    MessageBox({
                        title: '',
                        message: '请选择症状表现',
                        showCancelButton: false,
                        confirmButtonText: '知道了',
                    });
                    return;
                }
            }
        },
        created() {
//            this.$store.dispatch('clearSymptomsSelected');
        },
        computed: {
            selected() {
                    return this.$store.state.symptoms.selected

            },
            scrollH() {
                return this.selected.length > 0 ? '2.5rem' : '0'
            },
            scrollBot() {
                return this.selected.length > 0 ? '.9rem' : '0'
            }
        }
    }
</script>
<style>

</style>
