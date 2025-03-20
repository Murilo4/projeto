'use client';

import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";


const Help = () => {
    const [doubs, setDoubs] = useState<string[]>([]);

  return (
    <div className="max-h-screen mt-20">
      <div className="flex items-center justify-between">
        <p className="flex justify-center">Dúvidas frequentes</p>

        <div>
            <li></li>
        </div>
      </div>  
    </div>
  );
};

export default Help;