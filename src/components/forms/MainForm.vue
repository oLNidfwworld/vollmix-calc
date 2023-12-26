<script lang="ts" setup>
interface UserData{
    name?: String,
    email?: String,
    phone?: String,
}
import VInput from '/src/components/controls/VInput.vue';
import VCheckbox from '/src/components/controls/VCheckbox.vue';
import VRadioElement from '/src/components/controls/VRadioElement.vue';
import VButton from '/src/components/controls/VButton.vue';
import { ref, h } from 'vue';

const confirm = ref(false);
const userData : Ref<UserData > = ref({
  name : '500',
  email : '500',
  phone : '500',
}); 
const castilb = '<p class="text-white ml-5">Я принимаю <a class="text-violet underline" href="/privacy/">соглашение об обработке персональных данных</a></p>';

const sendThisFuck = async ( ) => {
  console.log(userData.value);
  
  const response = await fetch('https://vollmix.group/ajax/handlers/mailFromV.php', {
    method : 'POST',
    body : JSON.stringify(userData.value)
  });

  console.log(await response.json());
}
</script>
<template>
  <div class="my-[100px]"> 
    <h2 class="mb-5  md:mb-10  section-title-style text-white">Заказать стяжку пола</h2>
    <div
      class="grid max-w-[722px] xl:max-w-[unset] grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:gap-5 gap-[18px] mb-5"
    > 
      <VInput   v-model="userData.name"
              required type="text" placeholder=" " :labelPlaceholder="'Ваше имя'" ></VInput>
      <VInput   v-model="userData.email"
              required type="text" placeholder=" " :labelPlaceholder="'E-mail'" ></VInput> 
      <VInput   v-model="userData.phone"
              required type="tel" placeholder="+7(___)-___-__-__" :labelPlaceholder="'Контактный телефон'" ></VInput>  
      
      <VCheckbox v-model="confirm"   :id="`confirmIt`" :attrName="`confirmIt`" :displayName="castilb"></VCheckbox>
    </div>
  </div>
  <VButton @click="sendThisFuck">Отправить заявку</VButton>
</template>
