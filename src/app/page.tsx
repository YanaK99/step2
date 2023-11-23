'use client'
import {useEffect, useMemo, useState} from "react";
import Card from "@/components/Card/Card";
import {IProduct} from "@/models/IProduct";
import {getProducts} from "@/app/api/products-action";
import styles from './page.module.css'
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import { FormControlLabel } from "@mui/material";
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button'


export default function Home() {
  const [data, setData] = useState<IProduct[]>([])
  const [inputValue, setInputValue] = useState('')
  const [currency, setCurrency] = useState('all')
  // const [rate, setRate] = useState('')

  // const convertedData  = useMemo(() => {
  //   return data.map((item) => ({...item, currency: }))
  // }, [data, rate]);

  const filteredDataByName = useMemo(() => {
    return data.filter((item) => inputValue.length > 2 ? item.name.toLowerCase().includes(inputValue) : true)
  }, [inputValue, data]);

  const filteredData = useMemo(() => {
        return filteredDataByName.filter((item) => currency === 'all' ? true : item.currency === currency)
  }, [filteredDataByName, currency]);



  const changeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
     const fetchProducts = async  () => {
       const res = await getProducts()
       setData(res)
     }
     fetchProducts().then(() => console.log('success')).catch((e) => console.log(e))
  }, []);

  return (
      <div className={styles.container}>
          <TextField id="outlined-basic" label="Name" variant="outlined" value={inputValue}  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(event.target.value);
          }}/>
          <RadioGroup
              defaultValue="all"
              name="radio-buttons-group"
              value={currency}
              onChange={changeCurrency}
          >
              <FormControlLabel value="all" control={<Radio />} label="all" />
              <FormControlLabel value="UAH" control={<Radio />} label="UAH" />
              <FormControlLabel value="USD" control={<Radio />} label="USD" />
          </RadioGroup>
          {/*<TextField type='number' id="outlined-basic" label="Rate" variant="outlined" value={rate}  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {*/}
          {/*    setRate(event.target.value);*/}
          {/*}}/>*/}
          {/*<Button className={styles.button} variant="contained">Reset</Button>*/}
          {/*<Button className={styles.button} variant="contained">convert to UAH</Button>*/}
          {/*<Button className={styles.button} variant="contained">convert to USD</Button>*/}
           <div className={styles.products}>
               {filteredData.length ? filteredData.map((item) => <Card {...item} key={item.productCode}/>): 'No Products'}
           </div>
      </div>
  )
}
