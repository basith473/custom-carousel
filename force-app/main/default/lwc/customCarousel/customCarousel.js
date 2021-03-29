/*
* enable-auto-scroll for autoScroll to enable
* slide-timer for controllingthe slider speed default is 3000
* slides-data is the data and data should in this format {image:'', heading:'', description:''}
* show-full is for 100% width other wise use customWidth
* custom-width is used for controlling the width of the slider
*/
import { api, LightningElement } from 'lwc';

const CARD_VISIBLE_CLASSES = 'fade slds-show'
const CARD_HIDDEN_CLASSES = 'fade slds-hide'

const DOT_VISIBLE_CLASSES = 'dot active'
const DOT_HIDDEN_CLASSES = 'dot'

const DEFAULT_SLIDER_TIMER = 3000
const DEFAULT_SLIDER_WIDTH = 700

export default class CustomCarousel extends LightningElement {
    slides = []
    slideIndex = 1
    timer

    @api slideTimer = DEFAULT_SLIDER_TIMER
    @api enableAutoScroll = false
    @api customWidth = DEFAULT_SLIDER_WIDTH
    @api showFull = false

    get maxWidth() {
        return this.showFull ? `width: 100%` : `width: ${Number(this.customWidth)}px`
    }

    @api 
    get slidesData() {
        return this.slides
    }

    set slidesData(data) {
        this.slides = data.map((item, index) => {
            return index === 0 ? {
                ...item,
                slideIndex: index + 1,
                cardClass: CARD_VISIBLE_CLASSES,
                dotClass: DOT_VISIBLE_CLASSES
            } : {
                ...item,
                slideIndex: index + 1,
                cardClass: CARD_HIDDEN_CLASSES,
                dotClass: DOT_HIDDEN_CLASSES
            }
        })
    }

    connectedCallback() {
        if( this.enableAutoScroll ) {
            this.timer = window.setInterval(() => {
                this.slideHandler(this.slideIndex + 1)
            }, Number(this.slideTimer))
        }
    }

    disconnectedCallback() {
        if( this.enableAutoScroll ) {
            window.clearInterval(this.timer)
        }
    }

    prevSlide() {
        let slideIndex = this.slideIndex - 1
        this.slideHandler(slideIndex)
    }

    nextSlide() {
         let slideIndex = this.slideIndex + 1
        this.slideHandler(slideIndex)
    }

    selectedSlide(event) {
        let slideIndex = Number(event.target.dataset.id)
        this.slideHandler(slideIndex)
    }

    slideHandler(id) {
        if( id > this.slidesData.length) {
            this.slideIndex = 1
        } else if( id < 1) {
            this.slideIndex = this.slidesData.length
        } else {
            this.slideIndex = id
        }

        this.slides = this.slides.map(item => {
            return this.slideIndex === item.slideIndex ? {
                ...item,
                cardClass: CARD_VISIBLE_CLASSES,
                dotClass: DOT_VISIBLE_CLASSES
            } : {
                ...item,
                cardClass: CARD_HIDDEN_CLASSES,
                dotClass: DOT_HIDDEN_CLASSES
            }
        })
    }

}