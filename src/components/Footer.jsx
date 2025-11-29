import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-purple-900 to-black text-white pt-12 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-15">
          {/* Company Information */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">AURO Marketing Agency</h3>
            <p className="text-gray-300 mb-4">
              We provide creative solutions in the field of 3D graphics and
              visual content. We create stunning visual experiences that inspire
              audiences and achieve your goals.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1E5nTQ4Z1g/?mibextid=wwXIfr"
                className="text-purple-300 hover:text-white transition"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/auro__company?igsh=a3NjcHAxbHB1cmRz"
                className="text-purple-300 hover:text-white transition"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://wa.me/201270514225"
                className="text-purple-300 hover:text-white transition"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@auro_agency_?_t=ZS-8vo5ECKZ7x6&_r=1"
                className="text-purple-300 hover:text-white transition"
              >
                <FaTiktok size={24} />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-purple-300 mt-1 mr-3" />
                <a
                  title="Find Us on Google Maps"
                  href="https://maps.app.goo.gl/ZqXX1HxkAW6gS1zS8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition"
                >
                  Botros street, Tanta, Egypt
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-purple-300 mr-3" />
                <a
                  href="tel:+201270514225"
                  className="text-gray-300 hover:text-purple-400 transition"
                >
                  +20 12 7051 4225
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-purple-300 mr-3" />
                <a
                  href="mailto:info@auro-eg.com"
                  className="text-gray-300 hover:text-purple-400 transition"
                >
                  info@auro-eg.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-purple-800 text-center text-gray-400">
          <p>
            {" "}
            All rights reserved &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://auro-eg.com"
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              AURO<sup>eg</sup>
            </a>{" "}
            Marketing Agency
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
