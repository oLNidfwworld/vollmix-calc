<script lang="ts" setup>
interface IUserData{
    action? : String,
    name?: String,
    email?: String,
    phone?: String,
}
interface IProps{
  otherData : Object,
}
import VInput from '/src/components/controls/VInput.vue';
import VCheckbox from '/src/components/controls/VCheckbox.vue';
import VRadioElement from '/src/components/controls/VRadioElement.vue';
import VButton from '/src/components/controls/VButton.vue';
import { ref, onMounted, watch } from 'vue';
import process from 'process';

const props = defineProps<IProps>();

const confirm = ref(false);
const errMsg = ref(false);

const isWarn = ref(false);
const userData : Ref<IUserData> = ref({
  action : 'SEND_FROM_CALC',
  name : '500',
  email : '500',
  phone : '500',
});  

const jsSuccessTemplate = () => {
            const template = document.createElement('div');
            template.classList.add('order-content-suc');

            template.innerHTML = `
                <div class="order-content__wrapper">


                    <div class="m-auto  w-fit mb-11 order-content-suc__suc-ico">
                        <\?xml version="1.0" standalone="no"\?>
                        <svg id="Vector" width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; max-height: 100%;">
                        <path d="M28.2618 57.2957L28.2619 57.2955C28.5074 56.1906 29.5572 55.1412 30.9698 54.6468C32.3179 54.3702 33.7134 54.6977 34.6627 55.6417L41.4034 62.5807L42.4638 63.6723L43.5399 62.5962L71.5287 34.6074C72.2515 33.8846 73.2639 33.4588 74.2396 33.4588H74.3462L74.4517 33.4438C75.2781 33.3257 76.2169 33.6753 76.9506 34.4089C77.6734 35.1318 78.0992 36.1442 78.0992 37.1199C78.0992 38.0953 77.6733 39.108 76.9506 39.8309C76.9506 39.8309 76.9505 39.8309 76.9505 39.831L45.1902 71.5912C44.4674 72.3141 43.455 72.7398 42.4793 72.7398C41.5037 72.7398 40.4912 72.314 39.7683 71.5912C39.7683 71.5912 39.7682 71.5912 39.7682 71.5911L29.2477 61.0706C28.2806 60.1035 27.9563 58.67 28.2618 57.2957ZM53.0001 104.5C24.6486 104.5 1.5 81.3514 1.5 53.0001C1.5 24.6488 24.6486 1.5 53.0001 1.5C66.6991 1.5 79.8148 6.90229 89.4563 16.5437C99.0977 26.1852 104.5 39.3009 104.5 52.9999C104.5 81.3514 81.3514 104.5 53.0001 104.5ZM96.7811 53.0001C96.7811 28.9515 77.2563 9.2191 53.0001 9.2191C28.7438 9.2191 9.2191 28.9515 9.2191 53.0001C9.2191 77.0487 28.7438 96.7811 53.0001 96.7811C64.7043 96.7811 75.8073 92.2616 84.0345 84.0346C92.2618 75.8074 96.7811 64.7043 96.7811 53.0001Z" stroke="#B611B6" stroke-width="3" stroke-dasharray="0,0,0,740.89404296875"><animate attributeType="XML" attributeName="stroke-dasharray" repeatCount="1" dur="2s" values="0,0,0,740.89404296875; 
                                0,370.447021484375,370.447021484375,0; 
                                740.89404296875,0,0,0" keyTimes="0; 0.5; 1" fill="freeze"></animate></path>
                        <setting>{"type":"direct","speed":25,"random":1,"shift":1,"size":1,"rupture":50}</setting></svg>
                    </div>
                    
                    <svg width="100%" class="mt-5 mb-11" height="1" viewBox="0 0 100% 100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line opacity="0.5" y1="0.5" x2="382" y2="0.5" stroke="var(--dark-violet"/>
                    </svg>
     
                    <svg width="75%" height="1" class="mb-11" viewBox="0 0 100% 100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line opacity="0.5" y1="0.5" x2="382" y2="0.5" stroke="var(--dark-violet"/>
                    </svg>
    
                    <h4 class="order-content-suc__title mb-11">Спасибо, Ваша заявка принята!</h4>
    
                    <svg width="100%" height="1" class="mb-11" viewBox="0 0 100% 100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line opacity="0.5" y1="0.5" x2="382" y2="0.5" stroke="var(--dark-violet"/>
                    </svg>

                    <p class="order-content-suc__desc mb-11">В скором времени с Вами свяжется наш менеджер</p>


                    <button id="close-this"  class="preset-2 btn m-auto ">
                        <span>ОК</span>
                    </button>
                </div> 
            `;
            template.querySelector('#close-this').addEventListener('click',popupModule.getInstance().hidePopup);

            return template;
        }  

const sendThisFuck = async ( ) => { 
  if( !confirm.value ) {
    isWarn.value = true;
    setTimeout(( ) => {
      isWarn.value = false;
    }, 1200)
  } else if(grecaptcha.getResponse() === '') { 
    errMsg.value = 'Ошибка проверки ReCaptcha ' 
  } else if (userData.value.phone.length < 16){
    errMsg.value = 'Некорректный номер'
  } else { 
    const data = {
      ...userData.value,
      ...props.otherData,
      'g-recaptcha-response': grecaptcha.getResponse()
    } 
    let route = '';
    if(process.env.NODE_ENV === 'development'){
      route = 'https://vollmix.group/Api/Calc/SendMsg';
    } else {
      route = '/Api/Calc/SendMsg';;
    }
    const response =  await fetch(route, {
      method : 'POST',
      body : JSON.stringify(data)
    });
    const responseData= await response.json();
    if(responseData.status === 'success'){
      popupModule.getInstance().renderContent(jsSuccessTemplate())
    } else {
      errMsg.value = responseData.msg;
    }
    grecaptcha.reset();
  } 

} 
onMounted(( ) => {
    if ( typeof(grecaptcha) === 'object') { 
      grecaptcha.ready( ( ) => {
        grecaptcha.render( 'captcha', { sitekey: '6LcqBvAoAAAAAN5PBBo-LLQVCbJ8FVfbrFfzucmX', } );
      }) 
    }
})
 

</script>
<template>
  <div class="my-[100px]"> 
    <h2 class="mb-5  md:mb-10  section-title-style text-white">Заказать стяжку пола</h2>
    <form @submit.prevent="sendThisFuck">
      <div
        class="grid max-w-[722px] xl:max-w-[unset] grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:gap-5 gap-[18px] mb-5"
      > 
          <VInput   v-model="userData.name"
                  required type="text" placeholder=" " :labelPlaceholder="'Ваше имя'" ></VInput>
          <VInput   v-model="userData.email"
                  required type="email"  placeholder=" " :labelPlaceholder="'E-mail'" ></VInput> 
          <VInput   v-model="userData.phone"  
                  required type="tel" placeholder="+7(___)-___-__-__" :labelPlaceholder="'Контактный телефон'" ></VInput>  
          <div>
            <div  id="captcha"></div>
          </div>
          <VCheckbox v-model="confirm" :isWarn="isWarn" :id="`confirmIt`" :attrName="`confirmIt`" >
            <p class="text-white ml-5">Я принимаю <a class="text-violet underline" href="/privacy/">соглашение об обработке персональных данных</a></p>
          </VCheckbox>
          
        </div>
      
        <span class="my-4 block" v-if="errMsg" style="color: rgb(218, 104, 125);">
          {{ errMsg }}
        </span>
      <VButton type="submit" >Отправить заявку</VButton>
    </form>
  </div>
</template>
