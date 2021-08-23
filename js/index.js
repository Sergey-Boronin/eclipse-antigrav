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
            breakpoint: 481,
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
        // slidesToShow: 1,
        arrows: true,
        speed: 1200,
        prevArrow: '<button class="slick-prev_place_portfolio slick-arrow_place_portfolio" aria-label="Previous" type="button" style=""></button>',
        nextArrow: '<button class="slick-next_place_portfolio slick-arrow_place_portfolio" aria-label="Previous" type="button" style=""></button>',
        centerMode: true,
        responsive: [
          {
            breakpoint: 481,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: false,
            }
          },
        ],
    });
})

);

$(function(){
  $(".intro__compare").twentytwenty();
});


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
      const bgContainer = document.querySelector('#calc-form');
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
const extrasImage = document.querySelector('.extras__img')

extrasRadioButtons.forEach((button) => {
  button.addEventListener('change', (e) => {
    extrasInput.value = ''
    extrasContentContainer.textContent="";
    const buttonId = e.target.id;
    extrasInput.value = e.target.id
    extrasContentContainer.textContent = extras[buttonId].content;
    extrasImage.setAttribute('src', `./images/extras-img-${buttonId}.png`)
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
    console.log(summary)
    priceInput.value = `${getPrice(summary)} руб`;
    const [pack, material, car] = summary;
    summaryInput.value = `Машина "${car}" комплект "${pack}" материал "${material}"`
  }

  const popupInfo = document.querySelector('.popup-info');

  const popupInfoCloseButton = document.querySelector('.popup__info-close');

  const calcSubmitButton = document.querySelector('#calc-submit-button'); 
  const form = document.querySelector('#calc-form')
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // const summaryInput = document.querySelector('#calc-summary-input');
    // const priceInput = document.querySelector('#calc-price-input');
    // const nameInput = document.querySelector('#calc-name-input');
    // const phoneInput = document.querySelector('#calc-phone-input');
    // console.log(summaryInput.value, priceInput.value, nameInput.value, phoneInput.value)
    console.log(popupInfo)
    popupInfo.classList.add('popup_opened')
  })

 
  const callbackForm = document.querySelector('#callback-form')
  callbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // const summaryInput = document.querySelector('#calc-summary-input');
    // const priceInput = document.querySelector('#calc-price-input');
    // const nameInput = document.querySelector('#calc-name-input');
    // const phoneInput = document.querySelector('#calc-phone-input');
    // console.log(summaryInput.value, priceInput.value, nameInput.value, phoneInput.value)
    console.log(popupInfo)
    popupInfo.classList.add('popup_opened')
    popup.classList.remove('popup_opened')
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

popupInfoCloseButton.addEventListener('click', () =>  {
  popupInfo.classList.remove('popup_opened');
})

const burgerButton = document.querySelector('.burger-button');
const mobileMenu = document.querySelector('.mobile-menu');
burgerButton.addEventListener('click', () => {
  
  mobileMenu.classList.toggle('block-hidden');
})

const navLinks = document.querySelectorAll('.navbar__item_place_mobile');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('block-hidden');
    burgerButton.classList.remove('opened')
  })
})
const header = document.querySelector('.header')

function headerScroll() {
 
// const sticky = header.offsetTop;
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// window.onscroll = function() {
//   headerScroll()
// };
