import { useState, FC, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";

type ServiceItemProps = {
  title: string;
  children: ReactNode;
};
const ServiceItem: FC<ServiceItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const variants = {
    open: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 },
  };

  const rotateVariants = {
    open: { rotate: 180 },
    collapsed: { rotate: 0 },
  };

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full text-left py-5 px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-xl">{title}</span>
        <motion.span
          className="text-gray-600"
          variants={rotateVariants}
          animate={isOpen ? "open" : "collapsed"}
          transition={{ duration: 0.4 }}
        >
          <HiChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-12 pb-4 leading-[3]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const ServicesList: FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:mt-[15vh]">
      <div className="max-w-4xl mx-auto">
        <h1 className=" text-4xl font-light text-center mt-8 mb-16">
          Make-up And Hairstyling Service
        </h1>
        <ServiceItem title="Wedding MakeUp And Hair">
          <ul className="list-disc pl-4">
            <li>Bridal MakeUp And Hair $699</li>
            <li>Makeup Trial $499</li>
            <li>Bridesmaid/Mom $299</li>
            <li>Groom $168</li>
          </ul>
        </ServiceItem>
        <ServiceItem title="Daily MakeUp And Hair">
          <ul className="list-disc pl-4">
            <li>Within Sydney area $350</li>
            <li>Travel fee will be appiled based on distance.</li>
          </ul>
        </ServiceItem>
        <ServiceItem title="Travel Fee">
          <ul className=" list-disc pl-4 mb-4">
            <li>Travel fee starts from $50 </li>
          </ul>
          <p>
            Please note all services priced as “from” indicate a guideline of
            price as personalised quotation may be required, this will be
            discussed in your consultation.
          </p>
        </ServiceItem>
        <ServiceItem title="Early Start Fee">
          <p className="pb-8">
            An early morning surcharge is payable if the appointment starts
            earlier than 7am. Please refer to the below table for charges.
          </p>
          <p className=" mb-4">Start Time Surcharge per stylist</p>
          <ul className="list-disc pl-6">
            <li>At or after 7am Nil</li>
            <li>Between 6-7am $50</li>
            <li>Between 5-6am $100</li>
            <li>Between 4-5am $150</li>
            <li>Between 4-5am $200</li>
          </ul>
        </ServiceItem>
        <ServiceItem title="Parking Fee">
          <p>
            Additional parking costs (if applicable) will also be added to
            bookings if our artists are not able to locate free parking close to
            your address. (Price on the Receipt)
          </p>
        </ServiceItem>
      </div>
    </div>
  );
};

export default ServicesList;
