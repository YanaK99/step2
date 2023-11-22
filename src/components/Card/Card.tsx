import React from 'react';
import {IProduct} from "@/models/IProduct";
import Image from 'next/image';
import styles from './card.module.css'

const Card = ({ productCode, name, qty, image, price, currency } : IProduct) => {
    const SIZE_IMAGE = 300
    return (
        <div className={styles.card}>
            <Image src={image} alt={name} width={SIZE_IMAGE} height={SIZE_IMAGE}/>
            <div>
                <h2>{name}</h2>
                <h3>code : {productCode}</h3>
                <div>quantity : {qty}</div>
                <div>{price} {currency}</div>
            </div>
        </div>
    );
};

export default Card;