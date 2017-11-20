<!--<style src="../../css/dialogue.css"></style>-->

<template>
    <div>
        <div class="dialogueWrap dialog-area udf_scroller" ref="dialogueWrap"
             :style="{height:wrapMaxH,marginBottom:wrapBtm}" v-if="!showProtocol">
            <div v-for="(item,index) in question" :key="index">
                <div v-for='(val,idx) in item.stems' :key="idx">
                    <Robot :stems=val :sn=item.sn></Robot>
                </div>
                <Patient :answer=item.answer></Patient>
            </div>
        </div>
        <Protocol v-if="showProtocol"/>
    </div>
</template>

<script>
    import '../../css/dialogue.css'

    import $ from 'jquery'
    import {mapState} from 'vuex'
    import Robot from './robot.vue'
    import Patient from './patient.vue'
    import Protocol from '../inquiry/protocol.vue'


    export default {
        name: 'DialogueFlux',
        components: {
            Robot,
            Patient,
            Protocol
        },
        created() {
            let params = this.$route.query.from;
            let self = this;
            if (params) {
                this.$store.dispatch('showLoading', true);
                this.$store.dispatch('toInquiry',
                    {par: params}).then(() => {
                    setTimeout(function () {
                        self.$store.dispatch('showLoading', false);
                    }, 500)
                });
            } else {
                this.$store.dispatch('showLoading', true);
                this.$store.dispatch('fetchQuestion');
            }

        },
        mounted() {
            this.setScrollH()
        },
        updated() {
            this.setScrollH()
        },
        computed: {
            ...mapState(['options', 'optionType', 'userInfoModal', 'question', 'showOptions', 'showPicker', 'diagnosis', 'diagnose', 'showProtocol',]),
            wrapBtm() {
                let {winH, root} = this.getH();

                if (this.options.length > 0 && this.optionType == 'TextOptions') {
                    return root * 5 + 'px'
                } else {
                    return root * 1 + 'px'
                }
            },
            wrapMaxH() {
                let {winH, root} = this.getH();

                if (this.options.length > 0 && this.optionType == 'TextOptions') {
                    return winH - root * 0.88 - root * 5 + root + 'px'
                } else if (this.options.length > 0 && this.optionType == 'ImageOptions') {

                    return winH - root * 0.88 - root * 5 + root + 'px'
                } else {
//                    return winH - root * 0.88 - root * 1 + 'px'
                    return winH - root * 0.88 + 10 + 'px'

                }
            },
            enterSymptoms() {
                let {question} = this.$store.state;
                if (question[0].answer.length > 0) {
                    return false
                } else {
                    return true
                }
            }
        },

        watch: {
            wrapMaxH() {
                let self = this
                setTimeout(function () {
                    self.setScrollH()
                }, 400)

            },

            question() {
                let self = this
                setTimeout(function () {
                    self.setScrollH()
                }, 400)
            }
        },
        methods: {
            getH() {
                let h = null,
                    winH = parseFloat($(window).height()),
                    root = parseFloat($('html').css('fontSize'))

                return {winH, root}
            },
            setScrollH() {
                this.$refs.dialogueWrap.scrollTop = this.$refs.dialogueWrap.scrollHeight - 10
            }

        }
    }
</script>
