import { LightningElement } from 'lwc';
import CAROUSEL_IMAGES from '@salesforce/resourceUrl/carousel';

export default class CustomCarouselWrapper extends LightningElement {

    slides = [
        {
            image: `${CAROUSEL_IMAGES}/carousel/image1.jpg`,
            heading: 'Caption One',
            description: 'Description one'
        },
        {
            image: `${CAROUSEL_IMAGES}/carousel/image2.jpg`,
            heading: 'Caption Two',
            description: 'Description Two'
        },
        {
            image: `${CAROUSEL_IMAGES}/carousel/image3.jpg`,
            heading: 'Caption Three',
            description: 'Description Three'
        }
    ]

}