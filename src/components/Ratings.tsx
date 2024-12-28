import React from 'react';
import { IoMdStar } from "react-icons/io";

interface RatingsProp {
    rating: number;
    size: string;
}

const Rating: React.FC<RatingsProp> = ({rating, size}) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
        <IoMdStar
            key={i} className={i <= rating ? 'text-yellow-300' : 'text-gray-300'}    
        />
        );
    }
    return (
        <div className={`flex flex-row ${size}`}>
            {stars}
        </div>
    )
}

export default Rating;