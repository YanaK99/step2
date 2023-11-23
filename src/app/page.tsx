'use client'
import {useEffect, useMemo, useState} from "react";
import Card from "@/components/Card/Card";
import {IProduct} from "@/models/IProduct";

import styles from './page.module.css'
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import { FormControlLabel } from "@mui/material";
import Radio from '@mui/material/Radio';



export default function Home() {
  const [data, setData] = useState<IProduct[]>([])
  const [inputValue, setInputValue] = useState('')
  const [currency, setCurrency] = useState('all')


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
       const res = fetch('/api/products').then((res) => res.json()).then((res) => setData(res))
     }
     fetchProducts()
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
           <div className={styles.products}>
               {filteredData.length ? filteredData.map((item) => <Card {...item} key={item.productCode}/>): 'No Products'}
           </div>
      </div>
  )
}
