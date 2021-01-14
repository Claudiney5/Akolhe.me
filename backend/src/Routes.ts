import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import FootholdsController from "./controllers/FootholdsControllers"

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/footholds', FootholdsController.index)
routes.get('/footholds/:id', FootholdsController.show)
routes.post('/footholds', upload.array('images'), FootholdsController.create)

export default routes