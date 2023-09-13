import {IonSelectOption} from '@ionic/react'

const SelectSuhu: React.FC = ()=>(
    <>
        <IonSelectOption value="celcius">Celcius(C)</IonSelectOption>
        <IonSelectOption value="fahrenheit">Fahrenheit(F)</IonSelectOption>
    </>
)

export default SelectSuhu; 