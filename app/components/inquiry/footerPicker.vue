<!-- footer picker -->
<template>
    <div class='pickerWrap'>
        <!--<picker-view class='pickerView' indicator-style="height: 40px;" bindchange="pickerChange" value="{{defaultValue}}">-->
        <!--<picker-view-column>-->
        <!--<view class="pickerLi" wx:for="{{options}}" wx:key='index' style="height:40px;line-height:40px;">{{item.text}}</view>-->
        <!--</picker-view-column>-->
        <!--</picker-view>-->
        <view class='sureBtn positR' bindtap='surePicker'>
            <view class='imgCont'>
                确认
            </view>
            <view class='imgWrap'>
                <image src='../../images/btnBg.jpg'></image>
            </view>
        </view>
    </div>
</template>
<script>
    import $ from 'jquery'
    import Picker from 'better-picker'
    import { talkFetchFunc } from '../../store/actions'

    export default {
        name: 'FooterTwoOpt',
        components: {},
        data() {
            return {}
        },
        created() {


        },
        methods: {
//            hit() {
//             let productPicker = new Picker({ data: [1, 2, 3, 4], title: '选择产品' }),
//                    productPicker.show()
//            }
        },
        computed: {}

    }
</script>

export default {
name: 'Test',
components: {},
methods: {

}
}
