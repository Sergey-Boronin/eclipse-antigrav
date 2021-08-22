$( document ).ready(
  $(function(){
    $('.tel-mask').inputmask('+7(999)999-99-99');
    $('.catalog-slider').slick({
        // mobileFirst:true,
        arrows: true,
        slidesToShow: 4,
        speed: 1200,
        responsive: [
          {
            breakpoint: 426,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
        ],
        prevArrow: '<button class="slick-prev_place_catalog slick-arrow slick-arrow_place_catalog" aria-label="Previous" type="button" style=""></button>',
        nextArrow: '<button class="slick-next_place_catalog slick-arrow_place_catalog" aria-label="Previous" type="button" style=""></button>',
    });

    $('.portfolio-slider').slick({
        // slidesToShow: 1,
        // mobileFirst:true,
        arrows: true,
        speed: 1200,
        prevArrow: '<button class="slick-prev_place_portfolio slick-arrow_place_portfolio" aria-label="Previous" type="button" style=""></button>',
        nextArrow: '<button class="slick-next_place_portfolio slick-arrow_place_portfolio" aria-label="Previous" type="button" style=""></button>',
        centerMode: true,
        responsive: [
          {
            breakpoint: 426,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: false,
            }
          },
        ],
    });
    const portfolioCurrentSlide = document.querySelector('.portfolio-slider .slick-current');
    portfolioCurrentSlide.previousSibling.classList.add('portfolio-prev-slide');
    portfolioCurrentSlide.nextSibling.classList.add('portfolio-next-slide');
})
);


//включить стандартное поведение карты по клику на обертку
const map = document.querySelector('.map');
const yMap = document.querySelector('.map-yandex');
map.addEventListener('click', () => {
  yMap.classList.add('map-yandex_active');
});


//включить плавную прокрутку из меню
const anchors = document.querySelectorAll('.navbar__link');
anchors.forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();

    const sectionId = anchor.getAttribute('href');

    document.querySelector(sectionId).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
})

//собрать массив с id выбранных radio
//по умолчанию первым элементом будет id radio в первом шаге с атрибутом checked
// const radioSummary = []; 
const radioSummary = [document.querySelector('#step1').querySelector('input[type="radio"]:checked').id]; 



const stepNextButtons = document.querySelectorAll('.button_place_calc-next');
const stepPrevButtons = document.querySelectorAll('.button_place_calc-prev');

const radioButtons1 = document.querySelectorAll('.step1-radio');
const radioButtons2 = document.querySelectorAll('.step2-radio');
const radioButtons3 = document.querySelectorAll('.step3-radio');


//смена контента в калькуляторе
radioButtons1.forEach(item => {
  item.addEventListener('change', (e) => {
    const list = document.createElement('ul')
    list.classList.add('main-list_place_calc', 'main-list')
      const pack = e.target.id
      console.log(pack)
      const bgContainer = document.querySelector('#calc-form');
      console.log(bgContainer.style.background)
      console.log(bgContainer)
      // bgContainer.style.backgroundImage = `url(../images/calculator-bg-${k1}.png)`
      // $('#calc-form').removeClass('calc-pack');
      $("form[class*='calc-pack']").removeClass (function (index, css) {
        return (css.match (/(^|\s)calc-pack\S+/g) || []).join(' ');
     });
     bgContainer.classList.add(`calc-pack-${pack}`)

      packs[pack].forEach(item => {
        const initList = document.querySelector('.main-list_place_calc');
        initList.remove()
        const listItem = document.createElement('li');
        listItem.classList.add('main-list__item', 'main-list__item_place_calc');
        listItem.textContent = item;
        list.append(listItem);
        document.querySelector('.form-wrapper').append(list);
      
        
 
      });
    });
  });

//смена контента в доп. услугах
const extrasRadioButtons = document.querySelectorAll('.extras-radio');
const extrasContentContainer = document.querySelector('#extras-content');
const extrasPriceContainer = document.querySelector('#extras-price');
const extrasInput = document.querySelector('#extras-input');

console.log(extrasContentContainer)

extrasRadioButtons.forEach((button) => {
  button.addEventListener('change', (e) => {
    extrasInput.value = ''
    extrasContentContainer.textContent="";
    const buttonId = e.target.id;
    extrasInput.value = e.target.id
    extrasContentContainer.textContent = extras[buttonId].content;
    console.log(extrasInput.value)
  })
})



  stepNextButtons.forEach( (button) => {
    button.addEventListener('click', (e) => {
    const stepNumber = parseInt(e.target.id.slice(-1));
    const currentStep = document.querySelector(`#step${stepNumber}`)  
    const nextStep = document.querySelector(`#step${parseInt(stepNumber)+1}`)  
    currentStep.classList.add('block-hidden');
    nextStep.classList.remove('block-hidden');
    if(parseInt(nextStep.id.slice(-1)) <= stepNextButtons.length ){
      radioSummary.push(nextStep.querySelector('input[type="radio"]:checked').id);
    };
    if(parseInt(nextStep.id.slice(-1)) == 3 ){
      setPrise(radioSummary)
    };
    });
  });

stepPrevButtons.forEach( (button) => {
  button.addEventListener('click', (e) => {
  const stepNumber = parseInt(e.target.id.slice(-1));
  const currentStep = document.querySelector(`#step${stepNumber}`)  
  const prevStep = document.querySelector(`#step${parseInt(stepNumber)-1}`)  
  currentStep.classList.add('block-hidden');
  prevStep.classList.remove('block-hidden');
  radioSummary.splice(stepNumber-2, 1);
  })
})

//переключение контента в шаге №1 калькулятора

  radioButtons1.forEach(item => {
    item.addEventListener('change', (e) => {
      radioSummary.pop()
      radioSummary.push(e.target.id)
    })
  })

  radioButtons2.forEach(item => {
    item.addEventListener('change', (e) => {
      radioSummary.pop()
      radioSummary.push(e.target.id)
    })
  })

  radioButtons3.forEach(item => {
    item.addEventListener('change', (e) => {

      radioSummary.pop()
      radioSummary.push(e.target.id)
      setPrise(radioSummary);
    })
  })

  function getPrice(summary) {
    const [pack, material, car] = summary;
    return price[car][pack][material]
  }

  function setPrise(summary){
    const priceContainer = document.querySelector('.step-price__price');

    priceContainer.textContent='';
    priceContainer.textContent = `${getPrice(summary)} руб`;

    const summaryInput = document.querySelector('#calc-summary-input');
    const priceInput = document.querySelector('#calc-price-input');

    priceInput.value = `${getPrice(summary)} руб`;
    const [pack, material, car] = summary;
    console.log(summary)
    summaryInput.value = `Машина "${car}" комплект "${pack}" материал "${material}"`
  }

  const calcSubmitButton = document.querySelector('#calc-submit-button'); 
  console.log(calcSubmitButton)
  const form = document.querySelector('#calc-form')
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const summaryInput = document.querySelector('#calc-summary-input');
    const priceInput = document.querySelector('#calc-price-input');
    const nameInput = document.querySelector('#calc-name-input');
    const phoneInput = document.querySelector('#calc-phone-input');
    console.log(summaryInput.value, priceInput.value, nameInput.value, phoneInput.value)
  })

  // Анимация бургера
  function burgerRotate() {
    const toggle = document.querySelector('.burger-button');
    
    toggle.addEventListener('click', function(e) {
      this.classList.toggle('opened');
    });
  };

  burgerRotate();

  // popup

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');

const buttonAction = document.querySelectorAll('.button-action');
buttonAction.forEach((button) => {
  
  button.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('popup_opened');
  });
});

popupCloseButton.addEventListener('click', () =>  {
  popup.classList.remove('popup_opened');
})




