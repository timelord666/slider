'use strict';

class Slider {
    constructor({
        main,
        wrap,
        next,
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 3,
        responsive = []
    }) {
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            infinity,
            widthOfSlide: Math.floor(100 / this.slidesToShow)
        }

        this.responsive = responsive;
    }

    init() {
        this.addClass();
        this.addStyle();

        if (this.next && this.prev) {
            this.slideControl();
        } else {
            this.addArrow();
            this.slideControl();
        }
        if (this.responsive) {
            
            this.responsiveInit();

        }

    }

    addClass() {
        this.main.classList.add('slider');
        this.wrap.classList.add('slider__wrap');
        for (let i of this.slides) {
            i.classList.add('slider__item');
        }
    }

    addStyle() {
        let style = document.getElementById('slider-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'slider-style';
        }

        
        style.textContent = `
        .slider {
            overflow: hidden !important;

        }

        .slider__wrap {
            display: flex !important;
            transition: transform 0.5s !important;
            will-change: transform !important;
        }

        .slider__item {
            display: flex !important;
            justify-content: center;
            align-items: center;
            flex: 0 0 ${this.options.widthOfSlide}% !important;
            margin: auto 0 !important;
        }

        `
        document.head.appendChild(style);
    }


    slideControl() {
        this.prev.addEventListener('click', this.prevSlide.bind(this));
        this.next.addEventListener('click', this.nextSlide.bind(this));
    }

    prevSlide() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            console.log(this.options.position);
            if (this.options.position < 0) {
                
                this.options.position = this.slides.length - this.slidesToShow;
                
                
            } 
                
                this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthOfSlide}%)`;
            

        }
        

    }

    nextSlide() {
        if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
            ++this.options.position;
            console.log(this.options.position);
            if (this.options.position > this.slides.length - this.slidesToShow) {
                this.options.position = 0;       
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthOfSlide}%)`;
            
        }
        
    }

    



    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'slider__prev';
        this.next.className = 'slider__next';


        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');
        
        style.textContent = `
        .slider__prev, .slider__next {
            margin: 0 10px;
            border: 20px solid transparent;
            background: transparent;
            


        }

        .slider__prev {
            border-right-color: #19b5fe
        }
        
        
        .slider__next {
            border-left-color: #19b5fe
        }


        .slider__prev:hover,
        .slider__prev:hover,
        .slider__next:focus,
        .slider__next:focus {
            background: transparent;
            outline: transparent
        }

        `
        document.head.appendChild(style);




    }


    responsiveInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(i => i.breakpoint);
        const maxResponsive = Math.max(...allResponse);
        

        const chekRes = () => {
            const res = document.documentElement.clientWidth;
            
            if (res < maxResponsive) {
                
                
                for (let i = 0; i < allResponse.length; i++) {
                    if (res < allResponse[i]) {
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        this.options.widthOfSlide =  Math.floor(100 / this.slidesToShow);
                        this.addStyle();

                     } 
                }
            } else {
                     this.slidesToShow = slidesToShowDefault;
                     this.options.widthOfSlide = Math.floor(100 / this.slidesToShow);
                     this.addStyle();
                 }
        }

        chekRes();

        window.addEventListener('resize', chekRes);
    }
}