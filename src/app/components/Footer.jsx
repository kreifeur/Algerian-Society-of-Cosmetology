// components/Footer.js
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#4b2c5e] text-white py-12 px-6 w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Algerian Society of Cosmetology
            </h3>
            <p className="mb-4">
              Algerian Society of Cosmetology est une une association à but non
              lucratif qui regroupe et représente les pharmaciens exerçant dans
              différents secteurs
            </p>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/Fapdz/"
                className="h-10 w-10 bg-[#4b2c5e] rounded-full flex items-center justify-center hover:bg-[#4b2c5e] transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="h-10 w-10 bg-[#4b2c5e] rounded-full flex items-center justify-center hover:bg-[#4b2c5e] transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <FaTwitter />
              </a>
              <a
                href="#"
                className="h-10 w-10 bg-[#4b2c5e] rounded-full flex items-center justify-center hover:bg-[#4b2c5e] transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="h-10 w-10 bg-[#4b2c5e] rounded-full flex items-center justify-center hover:bg-[#4b2c5e] transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-yellow-300 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-yellow-300 transition-colors"
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="hover:text-yellow-300 transition-colors"
                >
                  Événements
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="hover:text-yellow-300 transition-colors"
                >
                  Galerie
                </a>
              </li>
              <li>
                <a
                  href="/membership"
                  className="hover:text-yellow-300 transition-colors"
                >
                  Adhésion
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <address className="not-italic">
              <p className="mb-2">
                Chez pharma invest , Centre commercial et des affaires ElQods
                cheraga , Alger .
              </p>
              <p className="mb-2">Tél: +213 550 51 07</p>
              <p className="mb-2">Email: contact@Fapharmacie.dz</p>
            </address>
          </div>
        </div>

        <div className="border-t border-bg-[#4b2c5e] mt-10 pt-6 text-center">
          <p>
            &copy; 2025 Algerian Society of Cosmetology. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
