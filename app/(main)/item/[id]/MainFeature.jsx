"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

function MainFeature() {
    const ref = useRef(null);
    const [images, setImages] = useState([]);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["center end", "start start"],
    });

    // ✅ Load images only after mount
    useEffect(() => {
        const loadedImages = [];
        for (let i = 1; i <= 86; i++) {
            const img = new window.Image();
            img.src = `/images/${i}.webp`;
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    const render = useCallback(
        (index) => {
            const canvas = ref.current;
            const context = canvas?.getContext("2d");
            if (context && images[index - 1]) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(images[index - 1], 0, 0);
            }
        },
        [images]
    );

    const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 86]);

    useMotionValueEvent(currentIndex, "change", (latest) => {
        render(Number(latest.toFixed()));
    });

    useEffect(() => {
        render(1);
    }, [render]);

    // 👇 Fade in as you scroll from 10% → 25%

    return (
        <div
            style={{
                height: "1000px",
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: 'initial'
            }}
        >
            <canvas
                ref={ref}
                width={1000}
                height={1000}
            />
        </div>
    );
}

export default MainFeature;
