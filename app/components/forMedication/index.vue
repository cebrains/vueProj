<template>
    <section class="medical-style" style="overflow-y:auto;">
        <!--<TopNav text="用药方案" showBack="1"/>-->
        <section class="disease-area" ref="diseaseArea" style="height:100%">
            <!--<section class="disease-area" :style="{height:wrapMaxH}" ref="diseaseArea">-->
            <div>
                <div class="disease-name" style="margin-bottom:10px">{{this.drugName}}</div>
                <div class="cue">
                    <div style="display: inline-block;vertical-align: middle">
                        <span class="icon-tishi2" style="font-size: .38rem;"></span>
                    </div>
                    <span style="display:inline-block;vertical-align: middle;width: 90%;margin-left: 6px;">
                        为了您更好的康复，需要针对疾病和疾病引发的症状同时用药才能达到更好的疗效哦！
                    </span>
                </div>
            </div>
            <!--<div style="height:74%;overflow-y: auto">-->
            <div>
                <div v-for="drugUsePlan in drugUsePlans">
                    <div class="cause-disease" v-if="drugUsePlan.items && drugUsePlan.items.length>0">
                        <div class="title" style="color:#333">
                            {{drugUsePlan.name}}<span>(共{{drugUsePlan.items.length}}个)</span></div>
                        <div class="cause-disease-medical" v-for="(item, index) in drugUsePlan.items">
                            <label for="" class="checkWrap">
                                <input type="checkbox" :id="'myCheck'+item.id" class="myCheckbox"
                                       v-model="item.checkValue" @change="changeValueHandle">
                                <label :for="'myCheck'+item.id" class="icon-approval"></label>
                            </label>
                            <div style="width: 89%;;display: inline-block;vertical-align: middle;">
                                <div class='imgContent' style="display: inline-block;vertical-align: top">
                                    <img :src="item.images[0].url" v-if="item.images && item.images.length>0"/>
                                </div>
                                <div class="medical-name">
                                    <div @click="showMedicalInfo(item.id)"
                                         style="display: inline-block;vertical-align: middle;font-size: .28rem;font-weight: bold">
                                        {{item.name}}
                                    </div>
                                    <br>
                                    <div style="display: inline-block;vertical-align: middle;font-size: .24rem;">
                                        <span>规格：</span>
                                        <span>{{item.spec.text}}</span>
                                        <span>{{item.spec.unit}}</span>
                                    </div>
                                    <div class="medical-price">
                                        <div style="display: inline-block;margin-top: 4px;color:#FF2F4A;font-size:.32rem">
                                            ¥{{item.price}}
                                        </div>
                                        <table>
                                            <tr>
                                                <td @click="minus(item)">-</td>
                                                <td>{{item.quantity}}</td>
                                                <td @click="plus(item)">+</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                                <div style=" width: 85%;margin-top: .32rem;margin-left: .6rem;
                            border-radius: .16rem;background-color: #f5f5f5;position:relative;padding:.2rem 0 .2rem .36rem;"
                                     v-if="drugUsePlan.name=='病因治疗'">
                                    <div class="triangle-up"></div>
                                    <div v-if="item.treatmentNames&&item.treatmentNames.length>0">
                                        适用病因：{{item.treatmentNameStr}}
                                    </div>
                                    <div v-if="item.indications&&item.indications.length>0">
                                        针对症状：{{item.indicationStr}}</div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer style="position: fixed;width: 100%;bottom: 0;">
                <div class="price-total">
                    <span style="font-size: .28rem;margin-left:20px">合计：<span
                            style="color:#FF2F4A;font-size: .36rem">¥{{this.totalObj.totalMoney }}</span></span>
                    <span @click="payForDetailList" style="display: inline-block;vertical-align: middle;width:3rem;height:1rem;
                    line-height: 1rem;overflow: hidden;position: relative;color:#ffffff;text-align: center;font-size:.35rem">
                        <img src="../../images/btnBg.jpg" style="width:100%;height:100%">
                        <span style="position: absolute;top: -1px;width: 100%;left: -1px;">
                            <span>提交清单</span>
                           <span style="font-size: .3rem;"> ({{ this.totalObj.totalNum }})</span>
                        </span>
                    </span>
                </div>
            </footer>
        </section>
    </section>
</template>
<script>
    import $ from 'jquery'
    import {mapState} from 'vuex'
    import TopNav from '../title/index.vue'
    import RadioGroup from '../common/radio/radioGroup.vue'
    import '../../css/forMedication.css'

    export default {
        name: 'ForMedication',
        components: {TopNav, RadioGroup},
        data() {
            return {
                checked: true,
//                totalObj: {
//                    totalMoney: 0,
//                    totalNum: 0}
                drugName: ''
            }
        },
        created() {
            this.onload();
            this.drugName = this.$route.query.name;
        },
        computed: {
            ...mapState(['num1', 'diagnoseResult', 'drugUsePlans', 'totalObj', 'drugPlansTitle', 'firstDisease']),
            selected() {
                return this.$store.state.symptoms.selected;
            },
            wrapBtm() {
                let {winH, root} = this.getH()

//                if (!this.drugUsePlans[0].items || this.drugUsePlans[0].items.length > 0) {
//                    return root * 1 + 'px'
//                } else {
//                    return root * 4 + 'px'
//                }
            },
            wrapMaxH() {
                let {winH, root} = this.getH();

//                if (this.drugUsePlans[0].items.length > 0 || !this.drugUsePlans[0].items) {
//                    return winH - root * 0.88 - root * 1 + 43 + 'px'
//                } else {
//                    return winH - root * 0.88 - root * 4 + 'px'
//                }
            },
        },
        watch: {
            wrapMaxH() {
                let self = this
                setTimeout(function () {
                    self.setScrollH()
                }, 400)

            },
        },
        methods: {
//            showIndications(item,drugName){
//                if(this.selected&&this.selected.length>=2&&drugName=="病因治疗"){
//                if(this.selected&&this.selected.length>=2){
//                    let matchNumber=0;
//                    for(let k=0;k<this.selected.length;k++){
//                        let _text=this.selected[k].text;
//                        if(item.indicationStr.indexOf(_text)){
//                            matchNumber++;
//                        }
//                    }
//                    return matchNumber>=1;
//                    return matchNumber>=2;
//                }else{
//                   return false;
//                }
//                return this.selected&&this.selected.length>=2;
//                return this.selected&&this.selected.length>=2&&this.drugUsePlan.name=='病因治疗'
//            },
            getH() {
                let h = null,
                    winH = parseFloat($(window).height()),
                    root = parseFloat($('html').css('fontSize'));

                return {winH, root}
            },
            setScrollH() {
                this.$refs.diseaseArea.scrollTop = this.$refs.diseaseArea.scrollHeight - 10
            },
            onload() {
                this.changeValueHandle();
            },
            changeValueHandle() {
                //选择'商品总费用'
                let total = 0, num = 0;
                //遍历商品
                for (let k = 0; k < this.drugUsePlans.length; k++) {

                    if (this.drugUsePlans[k].items && this.drugUsePlans[k].items.length > 0) {
                        var _d = this.drugUsePlans[k].items;

                        for (let i = 0; i < _d.length; i++) {
                            let item = _d[i];
                            //判断‘商品状态’
                            if (item.checkValue) {
                                //商品状态为勾选时，记录'商品总费用'
                                total = Number(total) + Number(item.price) * Number(item.quantity);
                                //对‘商品总费用’小数进行精度处理--取两位小数，四舍五入
                                total = Number(total).toFixed(2);
                                num = num + 1;
                            }
                        }
                    }

                }
                //将选择商品总费用赋值给页面合计变量
                this.totalObj.totalMoney = Number(total).toFixed(2);
                this.totalObj.totalNum = num;
            },
            minus(item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else if (item.quantity <= 1) {
                    item.quantity = 1;
                }
                this.changeValueHandle()
            },
            plus(item) {
                item.quantity++;
                this.changeValueHandle()
            },
            payForDetailList() {
                this.$router.push('/detailedList')
            },
            showMedicalInfo(param) {
                let self = this;
                self.$store.dispatch('showMedInfoFunc', {
                    param,
                    cb: function () {
                        self.$router.push('/showMedicalInfo')
                    }
                });

            }
        }
    }

</script>