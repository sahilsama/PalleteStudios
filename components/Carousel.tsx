"use client";
import Image from "next/image";

const images = [
    "/assets/images/pallete Prop/Model-A-closeup.png",
    "/assets/images/pallete Prop/Model-A-@.png",
    "/assets/images/pallete Prop/Model-B.jpg",
    "/assets/images/pallete Prop/Mdel-B-3.png",
    "/assets/images/pallete Prop/Model-D.jpg",
    "/assets/images/pallete Prop/Model-D-@.png",
  ];

export default function Carousel() {
    return (
      <div className="carousel">
        <div className="groupdocs">
          {images.map((src, idx) => (
            <div className="carddocs" key={idx}>
              <Image
                src={src}
                alt={`Image ${idx}`}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
  
        {/* Duplicate group for infinite loop effect */}
        <div aria-hidden className="groupdocs">
          {images.map((src, idx) => (
            <div className="carddocs" key={`dup-${idx}`}>
              <Image
                src={src}
                alt={`Image duplicate ${idx}`}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
}