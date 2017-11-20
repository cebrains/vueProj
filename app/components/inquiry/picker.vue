<template>
    <div class="pickerArea">
        <mt-picker :visibleItemCount="5" :slots="this.slotsFetch"
                   @change="onValuesChange"></mt-picker>
        <div class='sureBtn positR' @click='surePicker'>
            <div class="pickerChoice">
                确认
            </div>
            <div class='imgWrap'>
                <img src='../../images/btnBg.jpg' style="width: 100%;height: 100%"/>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {mapState} from 'vuex'
    import '../../css/picker.css';

    export default {
        name: 'Picker',
        data() {
            return {
                value: '',
                slots:[]
            }
        },
        created() {

        },

        computed: {
            ...mapState(['options', 'optionType', 'selectOption', 'question', 'showPicker']),
            slotsFetch(){
                var json={
                    values:[],
                    className:'slot'+(this.slots.length+1),
                    defaultIndex:0,
                },arr=[];

                console.log(this.slots);
                this.slots.push(json);

                for (let i = 0; i < this.options.length; i++) {
                    json.values.push(this.options[i].text);
                }
                arr.push(json);

                return arr;
            },
        },
        methods: {
            onValuesChange(picker, values) {
                if(values[0]==undefined){
                    values[0] = this.options[0].text;
                }
                this.value = values[0];
            },
            surePicker(e) {

                let self = this;
                let index = this.clone(this.slotsFetch[0]).values.indexOf(this.value);
                let val = this.options[index];
                this.$store.dispatch('showLoading', true);
                setTimeout(function () {
                    if (!val.key) return;
                    self.$store.dispatch('recordUserInp',
                        [{value: val.text, type: 'text'}]);
                    setTimeout(function () {
                        self.$store.dispatch('fetchFooterInfo', {value: val.key})
                            .then(() => {
                                self.$store.dispatch('showLoading', false);
                            });
                    }, 400)
                }, 600)
            },
            clone(from) {
                if (from instanceof Array) {
                    return this.cloneArr(from);
                } else if (from instanceof Object) {
                    return this.cloneObj(from);
                } else {
                    return (from);
                }
            },

            cloneObj(from) {
                return Object.keys(from).reduce((obj, key)=>(obj[key] = this.clone(from[key]), obj), {});
            },
            cloneArr(from) {
                return from.map((n)=>this.clone(n));
            },


        },
        updated(){
            this.$nextTick(() => {
                setTimeout(() => {//这个是一个初始化默认值的一个技巧
                            this.slotsFetch[0].defaultIndex= 2;
                }, 100);
            });
        },
    }
</script>

<style>
    .pickerArea {
        position: absolute;
        bottom: 1px;
        background: #fff;
        width: 100%;
        -webkit-transition: .5s;
        -moz-transition: .5s;
        -ms-transition: .5s;
        -o-transition: .5s;
        transition: .5s;
    }

    .pickerChoice {
        position: absolute;
        z-index: 9999;
        left: 0;
        right: 0;
    }
.slot1{
    width:100%;
}
    .picker-item {
        color: #ccc;
    }
</style>