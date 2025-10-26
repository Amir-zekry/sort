import Link from "next/link";
import React from "react";

function ItemReview() {
    const videoUrl = "https://youtu.be/HjFiucCByxM?si=4gYNG9nmOWhLLmPt";

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Embedded video on your website */}
            <div className="aspect-video w-full max-w-2xl">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/HjFiucCByxM?si=4gYNG9nmOWhLLmPt`}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-xl shadow-md"
                ></iframe>
            </div>

            {/* Link to open the video on YouTube */}
            <Link href={videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Watch on YouTube
            </Link>
        </div>
    );
}

export default ItemReview;
