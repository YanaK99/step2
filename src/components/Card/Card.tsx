import React from 'react';
import {IProduct} from "@/models/IProduct";
import Image from 'next/image';
import styles from './card.module.css'

const Card = ({ productCode, name, qty, image, price, currency } : IProduct) => {

  const imageSizeRegex = /(\d+)x(\d+)/;

  const match = image.match(imageSizeRegex);
  const width = match ? parseInt(match[1], 10) : 300;
  const height = match ? parseInt(match[2], 10) : 300;
    return (
        <div className={styles.card} style={{ width: `${width}px` }}>
            <Image src={image} alt={name} width={width} height={height}/>
            <div>
                <h3>{name}</h3>
                <h4>code : {productCode}</h4>
                <div>quantity : {qty}</div>
                <div>{price} {currency}</div>
            </div>
        </div>
    );
};

export default Card;