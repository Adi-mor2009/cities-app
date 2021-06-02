export default class CityModel {
    constructor(city, id, img, totalImages) {
        this.id = id;
        this.name = city;
        this.img = img;
        this.totalImages = totalImages;
    }

    setImage(img) {
        this.img = img; 
    }

    setTotalImages(totalImages) {
        this.totalImages = totalImages; 
    }
}