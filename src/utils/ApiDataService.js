import CityModel from "../model/CityModel";
import { createClient } from 'pexels';
import image from '../asserts/waiting.jpg';

async function getCityData(city, pageNum, size) {
    debugger
    const client = createClient('563492ad6f9170000100000122bbd5b61dd3428b85b45b0b0053b30a');
        const query = city.name;
        debugger
        const photos = await client.photos.search({ page: pageNum, query, per_page: 1 });
        if (!photos) {
            city.setImage({image});
            city.setTotalImages(1);
        }
        else {
            if (size) {
                city.setImage(photos.photos[0].src.tiny); 
            }
            else{
                city.setImage(photos.photos[0].src.medium);
            }
            city.setTotalImages(photos.total_results);
        }
        return city;
        // return new CityModel(city.name, city.id, photos.photos[0].src.medium, photos.total_results);
}

export default  {getCityData}