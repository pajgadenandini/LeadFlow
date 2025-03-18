import React from 'react';
import {Facebook, Twitter, Instagram, Mail, Phone} from 'lucide-react';

const Footer: React.FC = () => {
    return (
            <footer
                className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white ">
                <div className="container mx-auto px-6 sm:px-8 lg:px-10 py-8">
                    <div
                        className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
                        {/* Social Media Links */}
                        <div className="flex space-x-6">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-indigo-300 transition-colors duration-200"
                                aria-label="Facebook">
                                <Facebook size={24}/>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-indigo-300 transition-colors duration-200"
                                aria-label="Twitter">
                                <Twitter size={24}/>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-indigo-300 transition-colors duration-200"
                                aria-label="Instagram">
                                <Instagram size={24}/>
                            </a>
                        </div>

                        {/* Contact Us Section */}
                        <div
                            className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                            <div className="flex items-center space-x-2">
                                <Mail size={20}/>
                                <a
                                    href="mailto:support@leadflow.com"
                                    className="hover:text-indigo-300 transition-colors duration-200">
                                    info@leadflow.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone size={20}/>
                                <a
                                    href="tel:+1234567890"
                                    className="hover:text-indigo-300 transition-colors duration-200">
                                    +1 (234) 567-890
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center mt-8 pt-4 border-t border-white/20">
                        <p className="text-sm">
                            &copy; {new Date().getFullYear()} &nbsp;
                             LeadFlow. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
   
    );
};

export default Footer;