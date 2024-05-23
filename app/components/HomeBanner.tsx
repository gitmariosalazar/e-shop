import Image from "next/image";
import image_main from "../../public/images/image_main.png";
import LogoMarioSalazar from "../../public/images/LogoMarioSalazar.gif";
import "@/css/homepage.css";
import Link from "next/link";

const HomeBanner = () => {
  return (
    <div
      className="relative bg-gradient-to-r
    from-sky-500 to-sky-700 mb-8"
    >
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div>
          <div className="box-image">
            <Link
              href="https://mario-webpage-salazar.onrender.com/"
              title="Go to page Mario Salazar"
            >
              <Image
                src={LogoMarioSalazar}
                alt="Mario Salazar"
                className="home-image"
              />
            </Link>
          </div>
        </div>
        <div
          className="
        mb-8
        md:mb-0
        text-center
        "
        >
          <h1
            className="text-4xl
          md:text-6xl
          font-bold
          text-white
          mb-4
          "
          >
            Summer Sale
          </h1>
        </div>
        <p
          className="text-1g
        md:text-xl
        text-white
        mb-2"
        >
          Enjoy discounts on selected items
        </p>
        <p
          className="text-2xl
        md:text-5xl
        text-yellow-400 font-bold"
        >
          GET 50% OFF
        </p>
        <div
          className="w-1/3
              relative aspect-video"
        >
          <Image
            src={image_main}
            fill
            alt="Banner Image"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
