import { createApp } from 'vue'
import './router/index'
import router from './router/index'

import './promise'

import * as utils from './utils/index'
router.app.config.globalProperties.$utils=utils