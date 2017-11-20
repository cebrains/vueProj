import Vue from 'vue'
import VueRouter from 'vue-router'
import Inquiry from '../components/inquiry/index.vue'
import Symptoms from '../components/symptoms/index.vue'
import Report from '../components/report/index.vue'
import Wiki from '../components/wiki/index.vue'
import ForMedication from '../components/forMedication/index.vue'
import DetailedList from '../components/detailedList/index.vue'
import ShowMedicalInfo from '../components/showMedicalInfo/index.vue'
import NoMedication from '../components/noMedication/index.vue'
import DiseaseSearch from '../components/diseaseSearch/index.vue'
import DiseaseList from '../components/diseaseSearch/index.vue'

Vue.use(VueRouter)
export default new VueRouter({
    // mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/inquiry'
        },
        {
            path: '/inquiry',
            components: {
                default: Inquiry
            }
        },
        {
            path: '/diseaseList',
            components: {
                default: DiseaseList
            }
        },
        {
            path: '/symptoms',
            components: {
                default: Symptoms
            },
            meta:{allowBack:false}
        }, {
            path: '/report',
            components: {
                default: Report
            }
        }, {
            path: '/wiki',
            components: {
                default: Wiki
            }
        }, {
            path: '/forMedication',
            components: {
                default: ForMedication
            }
        }, {
            path: '/detailedList',
            components: {
                default: DetailedList
            }
        }, {
            path: '/showMedicalInfo',
            components: {
                default: ShowMedicalInfo
            }
        }, {
            path: '/noMedication',
            components: {
                default: NoMedication
            }
        }, {
            path: '/diseaseSearch',
            components: {
                default: DiseaseSearch
            }
        }
    ]
})
