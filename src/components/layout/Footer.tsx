import React from 'react';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Smart Alert LEWS</h3>
            <p className="text-gray-600 mb-4">
              Landslide Early Warning System - Monitoring and alerting platform for landslide risk areas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-500">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-600 hover:text-primary-500">
                  Sensor Map
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-gray-600 hover:text-primary-500">
                  Citizen Reports
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-gray-600 hover:text-primary-500">
                  Education
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
            <address className="not-italic text-gray-600">
              <p>Smart Alert Landslide Early Warning System</p>
              <p>Jl. Panglima Batur</p>
              <p>Nusantara, East Kalimantan 12345</p>
              <p className="mt-2">Email: info-lews-system.@scpwiki.org</p>
              <p>Phone: +62 (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Smart Alert LEWS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
