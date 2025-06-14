import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqOperations } from '../lib/database';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    // Fetch FAQs from API
    fetch('http://localhost:5000/api/faqs')
      .then(res => res.json())
      .then(setFaqs)
      .catch(error => {
        console.error('Error loading FAQs:', error);
        setFaqs([]);
      });
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-green-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our renewable energy services, 
            installations, and policies.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  {faq.category && faq.category !== 'General' && (
                    <div className="mt-3">
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+923001234567"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Call Us: +92 300 1234567
            </a>
            <a 
              href="mailto:info@waheedsons.com"
              className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:border-gray-400 transition-colors duration-200"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;