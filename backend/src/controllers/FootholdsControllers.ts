import { Request, Response } from 'express'
import { getRepository, Index } from 'typeorm'
import footholdView from '../views/footholds_view'
import * as Yup from 'yup'

import Foothold from "../models/Foothold"

export default {
    async index(req: Request, res: Response){
        const footholdsRepository = getRepository(Foothold)

        const footholds = await footholdsRepository.find({
            relations: ['images']
        })

        return res.json(footholdView.renderMany(footholds))
    },

    async show(req: Request, res: Response){
        const { id } = req.params

        const footholdsRepository = getRepository(Foothold)

        const foothold = await footholdsRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(footholdView.render(foothold))
    },

    async create(req: Request, res: Response){
        const {
            owner,
            latitude,
            longitude,
            name,
            phone,
            whatsapp,
            city,
            day_max,
            cost,
            energy,
            water,
            bathroom,
            shower,
            extra_info
        } = req.body
    
        const footholdsRepository = getRepository(Foothold)

        const requestImages = req.files as Express.Multer.File[]

        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            owner,
            latitude,
            longitude,
            name,
            phone,
            whatsapp: whatsapp === 'true',
            city,
            day_max,
            cost,
            energy: energy === 'true',
            water: water === 'true',
            bathroom: bathroom === 'true',
            shower: shower === 'true',
            extra_info,
            images
        }

        const schema = Yup.object().shape({
            owner: Yup.string().required('Obrigatório'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            name: Yup.string().required(),
            phone: Yup.number().required(),
            whatsapp: Yup.boolean().required(),
            city: Yup.string().required('A cidade é obrigatória.'),
            day_max: Yup.number().required(),
            cost: Yup.number().required(),
            energy: Yup.boolean().required(),
            water: Yup.boolean().required(),
            bathroom: Yup.boolean().required(),
            shower: Yup.boolean().required(),
            extra_info: Yup.string().required().max(300),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        await schema.validate(data, {
            abortEarly: false,
        })
    
        const foothold = footholdsRepository.create(data)
    
        await footholdsRepository.save(foothold)
    
        return res.status(201).json(foothold)

    }
        
}