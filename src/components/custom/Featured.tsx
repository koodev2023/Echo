import Image from "next/image";
import React from "react";
// import CldImage from "../image/CldImage";

const Featured = () => {
  return (
    <div>
      <h1 className="text-4xl text-center mb-8">
        <b className="font-bold">Hello World!</b> Welcome to my fullstack
        Next.js blog!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
        <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video">
          {/* <CldImage
            // width="960"
            // height="600"
            fill
            src="photo-1724166573009-4634b974ebb2_jzbgnr"
            sizes="100vw"
            alt="Description of my image"
            priority
            // className="object-cover"

            placeholder="blur"
            blurDataURL="photo-1724166573009-4634b974ebb2_jzbgnr"
          /> */}
          <Image
            src="https://res.cloudinary.com/dxzh9xfsu/image/upload/v1728832014/photo-1724166573009-4634b974ebb2_jzbgnr.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 line-clamp-2 lg:line-clamp-3">
            Lorem ipsum dolor sit amet alim consectetur adipisicing elit.
          </h2>
          <p className="mb-6 text-muted-foreground line-clamp-2 lg:line-clamp-3 xl:line-clamp-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
