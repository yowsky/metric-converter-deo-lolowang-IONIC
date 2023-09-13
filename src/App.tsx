import { 
  setupIonicReact,
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonInput,
  IonCard,
  IonCardContent
} from '@ionic/react';

import {useRef,useState, useEffect} from 'react'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Komponen */
import SelectPanjang from './components/SelectPanjang';
import SelectMassa from './components/SelectMassa';
import SelectWaktu from './components/SelectWaktu';
import SelectArusListrik from './components/SelectArusListrik';
import SelectSuhu from './components/SelectSuhu';
import SelectJumlahZat from './components/SelectJumlahZat';
import SelectIntensitasCahaya from './components/SelectIntensitasCahaya';

setupIonicReact();

const App: React.FC = () => {

  // STATE
  const [metrik,setMetrik] = useState<string>()
  const [satuanPertama,setSatuanPertama] = useState<string>()
  const [satuanKedua,setSatuanKedua] = useState<string>()
  const [result,setResult] = useState<number>()

  // REF
  const nilaiAwalRef = useRef<HTMLIonInputElement>(null)
  const satuanPertamaIonSelect = useRef<HTMLIonSelectElement>(null)
  const satuanKeduaIonSelect = useRef<HTMLIonSelectElement>(null)

  // EFFECT
  useEffect(()=>{
    const nilaiAwal:number = Number(nilaiAwalRef.current?.value)
    if(satuanKedua && nilaiAwal) return convertMetrik(nilaiAwal)
  },[satuanPertama])

  useEffect(()=>{
    const nilaiAwal:number = Number(nilaiAwalRef.current?.value)
    if(satuanPertama && nilaiAwal) return convertMetrik(nilaiAwal)
  },[satuanKedua])

  useEffect(()=>{
    if(nilaiAwalRef.current != null){
      nilaiAwalRef.current.value = ''
    }

    if(satuanPertamaIonSelect.current != null){
      satuanPertamaIonSelect.current.value = ''
    }

    if(satuanKeduaIonSelect.current != null){
      satuanKeduaIonSelect.current.value = ''
    }

    setResult(0)
    setSatuanPertama('')
    setSatuanKedua('')
  },[metrik])

  // FUNCTION
  const metrikChangeHandler = (e: CustomEvent)=>{
    const selectedMetrik:string = e.detail.value

    setMetrik(selectedMetrik)
  }

  const satuanPertamaChangeHandler = (e: CustomEvent)=>{
    setSatuanPertama(e.detail.value)
  }

  const satuanKeduaChangeHandler = (e: CustomEvent)=>{
    setSatuanKedua(e.detail.value)
  }

  const nilaiAwalChangeHandler = (e: CustomEvent)=>{
    const nilaiAwal:number = e.detail.value
    if(nilaiAwal == 0 || !nilaiAwal) return setResult(0)

    if(!satuanPertama || !satuanKedua) return

    convertMetrik(nilaiAwal)
  }

  const convertMetrik = (nilaiAwal:number)=>{
    if(satuanPertama === satuanKedua) return setResult(nilaiAwal)

    // m ke km
    if(satuanPertama === 'meter' && satuanKedua === 'kilometer') return setResult(nilaiAwal/1000)
    // km ke m
    if(satuanPertama === 'kilometer' && satuanKedua === 'meter') return setResult(nilaiAwal*1000)
    
    // g ke kg
    if(satuanPertama === 'gram' && satuanKedua === 'kilogram') return setResult(nilaiAwal/1000)
    // kg ke g
    if(satuanPertama === 'kilogram' && satuanKedua === 'gram') return setResult(nilaiAwal*1000)
    
    // s ke min
    if(satuanPertama === 'sekon' && satuanKedua === 'menit') return setResult(nilaiAwal/60)
    // min ke s
    if(satuanPertama === 'menit' && satuanKedua === 'sekon') return setResult(nilaiAwal*60)

    // A ke nA
    if(satuanPertama === 'ampere' && satuanKedua === 'nanoampere') return setResult(nilaiAwal*1000000000)
    // nA ke A
    if(satuanPertama === 'nanoampere' && satuanKedua === 'ampere') return setResult(nilaiAwal/1000000000)

    // A ke nA
    if(satuanPertama === 'celcius' && satuanKedua === 'fahrenheit') return setResult((nilaiAwal*9/5)+32)
    // nA ke A
    if(satuanPertama === 'fahrenheit' && satuanKedua === 'celcius') return setResult((nilaiAwal-32)*5/9)

    // cd ke lm
    if(satuanPertama === 'candela' && satuanKedua === 'lumen') return setResult(nilaiAwal*12.56637)
    // lm ke cd
    if(satuanPertama === 'lumen' && satuanKedua === 'candela') return setResult(nilaiAwal/12.56637)

    // mol ke kmol
    if(satuanPertama === 'mole' && satuanKedua === 'kilomole') return setResult(nilaiAwal/1000)
    // kmol ke mol
    if(satuanPertama === 'kilomole' && satuanKedua === 'mole') return setResult(nilaiAwal*1000)
  }

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color={'light'}>
          <IonTitle>Metric Converter</IonTitle>
          <IonTitle size='small' >By. Deo Lolowang</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <IonGrid>

          <IonRow>
            <IonCol>
              <IonItem fill='solid'>
                <IonSelect label="Pilih Metrik" labelPlacement='floating' onIonChange={metrikChangeHandler}>
                  <IonSelectOption value="panjang">Panjang</IonSelectOption>
                  <IonSelectOption value="massa">Massa</IonSelectOption>
                  <IonSelectOption value="waktu">Waktu</IonSelectOption>
                  <IonSelectOption value="arusListrik">Arus Listrik</IonSelectOption>
                  <IonSelectOption value="suhu">Suhu</IonSelectOption>
                  <IonSelectOption value="intensitasCahaya">Intensitas Cahaya</IonSelectOption>
                  <IonSelectOption value="jumlahZat">Jumlah Zat</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
        
          <IonRow>
            <IonCol>
              <h2 className='ion-margin-horizontal'>Dari:</h2>
              <IonItem>
                <IonSelect label="-- Pilih Satuan" labelPlacement='floating' disabled={!metrik} onIonChange={satuanPertamaChangeHandler} ref={satuanPertamaIonSelect}>

                  {metrik == 'panjang' && (<SelectPanjang/>)}
                  {metrik == 'massa' && (<SelectMassa/>)}
                  {metrik == 'waktu' && (<SelectWaktu/>)}
                  {metrik == 'arusListrik' && (<SelectArusListrik/>)}
                  {metrik == 'suhu' && (<SelectSuhu/>)}
                  {metrik == 'intensitasCahaya' && (<SelectIntensitasCahaya/>)}
                  {metrik == 'jumlahZat' && (<SelectJumlahZat/>)}

                </IonSelect>
              </IonItem>
            </IonCol>

            <IonCol>
              <h2 className='ion-margin-horizontal'>Ke:</h2>
              <IonItem>
                <IonSelect label="-- Pilih Satuan" labelPlacement='floating' disabled={!metrik} onIonChange={satuanKeduaChangeHandler} ref={satuanKeduaIonSelect}>
                  {metrik == 'panjang' && (<SelectPanjang/>)}
                  {metrik == 'massa' && (<SelectMassa/>)}
                  {metrik == 'waktu' && (<SelectWaktu/>)}
                  {metrik == 'arusListrik' && (<SelectArusListrik/>)}
                  {metrik == 'suhu' && (<SelectSuhu/>)}
                  {metrik == 'intensitasCahaya' && (<SelectIntensitasCahaya/>)}
                  {metrik == 'jumlahZat' && (<SelectJumlahZat/>)}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow className='ion-margin-top'>
            <IonCol className='ion-margin-top'>
              <IonItem>
                <IonInput type='number' placeholder="Masukkan Nilai" className='ion-text-center' onIonInput={nilaiAwalChangeHandler} ref={nilaiAwalRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          {result ? (
          <IonRow className='ion-margin-top'>
            <IonCol className='ion-margin-top'>
              <IonCard color={'primary'}>
                <IonCardContent>
                  <h2 className='ion-text-center'>{result}</h2>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          ):null}

        </IonGrid>
      </IonContent>
    </IonApp>
  );
}

export default App;
