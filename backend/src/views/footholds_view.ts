import Foothold from '../models/Foothold'
import imagesView from './images_view'

export default {
    render(foothold: Foothold) {
        return {
            id: foothold.id,
            owner: foothold.owner,
            latitude: foothold.latitude,
            longitude: foothold.longitude,
            name: foothold.name,
            phone: foothold.phone,
            whatsapp: foothold.whatsapp,
            city: foothold.city,
            day_max: foothold.day_max,
            cost: foothold.cost,
            energy: foothold.energy,
            water: foothold.water,
            bathroom: foothold.bathroom,
            shower: foothold.shower,
            extra_info: foothold.extra_info,
            images: imagesView.renderMany(foothold.images)
        }
    },

    renderMany(footholds: Foothold[]) {
        return footholds.map(foothold => this.render(foothold))
    }
}