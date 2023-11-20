import { ref, watch } from 'vue'

export const calcData = () => {
  return [
    {
      code: 'styazhka',
      name: 'Стяжка пола',
      generalParams: {
        square: {
          code: 'square',
          name: 'Площадь помещения',
          inputValue: 49, 
          min : 50,
          errorMessage : '',
        },
        layerHeight: {
          code: 'layerHeight',
          name: 'Толщина слоя',
          inputValue: 4,
          min: 4,
          max: 15,
          errorMessage : '',
        }
      },
      communications: {
        warmFloor: {
          code: 'warmFloor',
          name: 'Система «Теплый пол»',
          price: 1000,
          value: false
        }
      },
      additionals: {
        zeroVolume: {
          code: 'zeroVolume',
          name: 'Шумоизоляция (Шума нет 100/супер)',
          price: 1200,
          value: false
        },
        armor: {
          code: 'armor',
          name: 'Армирование (⌀ сетки 4мм)',
          price: 150,
          value: false
        },
        penobeton: {
          code: 'penobeton',
          name: 'Пенобетон М300',
          price: 800,
          value: false
        }
        // zeroThermal : {
        //     code : 'zeroThermal',
        //     name : 'Теплоизоляция',
        //     price : 800,
        //     value : false,
        // },
      },
      itog: function () {
        let checboxesSum = 0
        let mainSum = 0

        let layerKoef = 0 

        let pricePerSquare = 880;
        pricePerSquare += layerKoef; 
        if (
          this.generalParams.square.inputValue < 60 &&
          this.generalParams.square.inputValue >= 50
        ) {
          mainSum = 50000
        } else if (this.generalParams.square.inputValue >= 60) {
          /**
           * periods
           * от 60 до 100 step = 5
           * от 100 до 150 step = 10
           * от 150 до 300 step = 50
           * от 300 до 600 step = 100
           * от 600 до 1000 step = 200
           * от 1000 ...
           */
          /**
           * pricePerSquare
           * 60-65 -> 65-70 = -40
           * 65-70 -> 85-90 = -30
           * 85-90 -> 400-500 = -10
           * 400-500 -> ... = -5
           */ 

          let step = 5;
          for (let counter = 60; counter <= this.generalParams.square.inputValue; counter += step) {
            if (counter >= 60 && counter < 100) {
              step = 5
            } else if (counter >= 100 && counter < 150) {
              step = 10
            } else if (counter >= 150 && counter < 300) {
              step = 50
            } else if (counter >= 300 && counter < 600) {
              step = 100
            } else if (counter >= 600) {
              step = 200
            }

            if (counter >= 60 && counter < 70) {
                pricePerSquare -= 40
            } else if (counter >= 70 && counter < 90) {
                pricePerSquare -= 30
            } else if (counter >= 90 && counter < 500) {
                pricePerSquare -= 10
            } else if (counter >= 500) {
                pricePerSquare -= 5
            }

            if( counter >= 1000 ) break;  
          }
          pricePerSquare += 40;   
          mainSum = pricePerSquare * this.generalParams.square.inputValue;
        } else {
            console.warn('Площадь помещения должна быть от 50m2')
        }

        Object.values({ ...this.additionals, ...this.communications }).map((obj) => {
          if (obj.value) {
            checboxesSum += obj.price * this.generalParams.square.inputValue
          }
        })

        return mainSum + checboxesSum
      },
      runWatchers : function () {
        watch( () => this.generalParams.square.inputValue, (newVal) => { 
          if( newVal < this.generalParams.square.min ){
              this.generalParams.square.errorMessage = 'Значение не должно быть меньше 50';
          }else{ 
            this.generalParams.square.errorMessage = '';
          }
        })
        watch( () => this.generalParams.layerHeight.inputValue, (newVal) => {
          if( newVal > this.generalParams.layerHeight.max || newVal <  this.generalParams.layerHeight.min  ) {
            this.generalParams.layerHeight.errorMessage = 'Значение должно быть в пределах от 4 до 15'
          } else {
            this.generalParams.layerHeight.errorMessage = '';
          }
        })
      },
      active: ref(true)
    }
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
