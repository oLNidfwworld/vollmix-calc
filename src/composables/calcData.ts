import { ref, computed } from 'vue';

export const calcData = ( ) : Array => {

    return [
        {
            code : 'styazhka',
            name : 'Стяжка пола',
            generalParams : {
                square : {
                    code : 'square',
                    name : 'Площадь помещения',
                    inputValue : 0
                },
                layerHeight : {
                    code : 'layerHeight',
                    name : 'Толщина слоя',
                    inputValue : undefined,
                    min : 4,
                    max : 15,
                }
            },
            communications : {
                warmFloor : {
                    code : 'warmFloor',
                    name : 'Система «Теплый пол»',
                    price : 1000,
                    value : false,
                }, 
            },
            additionals : {
                zeroVolume : {
                    code : 'zeroVolume',
                    name : 'Шумоизоляция (Шума нет 100/супер)',
                    price : 1200,
                    value : false,
                },
                armor : {
                    code : 'armor',
                    name : 'Армирование (⌀ сетки 4мм)',
                    price : 150,
                    value : false,
                },
                penobeton : {
                    code : 'penobeton',
                    name : 'Пенобетон М300',
                    price : 800,
                    value : false,
                },
                // zeroThermal : {
                //     code : 'zeroThermal',
                //     name : 'Теплоизоляция',
                //     price : 800,
                //     value : false,
                // },
            },
            itog : function ( ) {   
                let checboxesSum = 0;
                Object.values({...this.additionals, ...this.communications}).map(obj => {
                    if(obj.value) { 
                        checboxesSum += obj.price * this.generalParams.square.inputValue;
                    }
                })

                return /*( this.generalParams.square.inputValue * this.generalParams.layerHeight.inputValue)*/ + checboxesSum }  ,
            active : ref(true),
        },
        // {
        //     code : 'shtukaturka',
        //     name : 'Штукатурка пола',
        //     // 'generalParams' : [
        //     //     {
        //     //         name : 'Площадь помещения',
        //     //     },
        //     //     {
        //     //         name : 'Толщина слоя'
        //     //     }
        //     // ]
        //     active : ref(false),
        // }
    ]
}