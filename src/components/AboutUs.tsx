import portrait from "../assets/portrait-min.jpg";
import logo from "../assets/svg/makeup.svg";
import miror from "../assets/svg/mirror.svg";
import wedding from "../assets/svg/ring.svg";
import quality from "../assets/svg/quality.svg";
import house from "../assets/svg/house.svg";
import magic from "../assets/svg/magic.svg";
import { motion } from "framer-motion";

const AboutUs = () => {
  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="mx-auto sm:mx-8 pt-8 flex flex-col md:flex-row justify-around items-center gap-4 mb-20 ">
        <div className="w-full md:w-1/2 h-[80vh] md:h-auto lg:max-w-lg xl:max-w-xl object-contain">
          <img src={portrait} alt="Ella makeup portrait" />
        </div>
        <div className="text-center md:text-left md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl my-8 font-play">
            Transforming Dreams into Stunning Realities
          </h1>
          <h1 className="text-2xl font-play  mt-4 text-right mb-12 mr-4">
            - Ella's Makeup Artistry
          </h1>
          <p className="p-8">
            Welcome to the artistry of Ella, a seasoned makeup artist with a
            decade of experience in bringing bridal beauty dreams to life. Over
            the course of her illustrious career, Ella has been the creative
            force behind the stunning looks of over 500 brides, specializing in
            Asian bridal makeup. Her passion for makeup artistry is not just a
            profession, but a calling.
          </p>
        </div>
      </div>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <div className="mx-8 text-center sm:my-60 my-12">
          <h1 className="text-4xl md:text-6xl font-play mb-16 sm:mb-36">
            Philosophy
          </h1>
          <p className=" sm:w-9/12 md:w-2/3 xl:w-1/3 mx-auto sm:text-lg">
            Ella's approach to makeup artistry is rooted in the belief that true
            beauty lies in individuality. Her philosophy combines empowerment,
            personalization, and artistic innovation to create not just a look,
            but an experience. She sees each client as a unique canvas,
            celebrating their individual features and stories. Dedicated to
            continuous learning and embracing the latest trends, Ella ensures
            that every touch of her brush brings out the inner confidence and
            elegance of her clients. For Ella, makeup is more than an art; it's
            a journey of transformation and empowerment, creating lasting
            connections and unforgettable impressions.
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <div className="px-2 py-10">
          <div id="features" className="mx-auto max-w-6xl">
            <h2 className="text-center text-4xl tracking-tight text-slate-900 md:text-6xl font-play">
              Beauty Art, and Elegance Redefined
            </h2>
            <div className="mt-36 grid grid-cols-1 gap-6 text-center text-black md:grid-cols-3">
              <div className="rounded-xl bg-white px-6 py-8 shadow-md">
                <img src={logo} alt="" className="mx-auto h-10 w-10" />
                <h3 className="my-3 text-lg">
                  Expertise with a Personal Touch
                </h3>
                <p className="mt-1.5 leading-6">
                  Ella's decade-long journey in makeup artistry, blending
                  traditional styles with contemporary flair for every unique
                  bride.
                </p>
              </div>

              <div className="rounded-xl bg-white px-6 py-8 shadow-md">
                <img src={miror} alt="" className="mx-auto h-10 w-10" />
                <h3 className="my-3 text-lg">A Detail-Oriented Approach</h3>
                <p className="mt-1.5 leading-6">
                  Precision in every brushstroke, crafting looks that resonate
                  with elegance and grace for the perfect bridal glow.
                </p>
              </div>

              <div className="rounded-xl bg-white px-6 py-8 shadow-md">
                <img src={wedding} alt="" className="mx-auto h-10 w-10" />
                <h3 className="my-3 text-lg">More Than Just Weddings</h3>
                <p className="mt-1.5 leading-6">
                  Versatile artistry for all occasions, from birthday parties to
                  corporate events, ensuring everyone looks and feels fabulous.
                </p>
              </div>

              <div className="rounded-xl bg-white px-6 py-8 shadow-md">
                <img src={quality} alt="" className="mx-auto h-10 w-10" />
                <h3 className="my-3 text-lg">The Promise of Quality</h3>
                <p className="mt-1.5 leading-6">
                  Only the highest quality products for diverse skin types and
                  tones, ensuring top-notch hygiene and comfort.
                </p>
              </div>

              <div className="rounded-xl bg-white px-6 py-8 shadow-md">
                <img src={house} alt="" className="mx-auto h-10 w-10" />
                <h3 className="my-3 text-xl">
                  Join the Family of Beautiful Stories
                </h3>
                <p className="mt-1.5 leading-6">
                  Becoming part of a family that cherishes and celebrates beauty
                  and individuality with every makeover.
                </p>
              </div>

              <div className="rounded-xl bg-white px-6 py-8 shadow-md">
                <img src={magic} alt="" className="mx-auto h-10 w-10" />
                <h3 className="my-3 text-xl">Discover the Magic</h3>
                <p className="mt-1.5 leading-6">
                  Experience the transformation with Ella, where beauty,
                  confidence, and elegance come alive in every brushstroke.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AboutUs;
