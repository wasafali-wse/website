import React from 'react';
import { Star, Quote } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      name: 'Sarah Johnson',
      location: 'Downtown Business District',
      rating: 5,
      text: 'ElectroTech Solutions saved my business! When our POS system crashed during peak hours, they had a technician on-site within 30 minutes. Professional, fast, and reasonably priced.',
      service: 'Emergency Repair',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Mike Chen',
      location: 'Residential Customer',
      rating: 5,
      text: 'Had them set up my entire smart home system. The technicians were knowledgeable, clean, and explained everything clearly. The system works flawlessly!',
      service: 'Smart Home Installation',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Lisa Rodriguez',
      location: 'Local Restaurant Owner',
      rating: 5,
      text: 'We needed a complete network overhaul for our restaurant. ElectroTech delivered on time, on budget, and the Wi-Fi coverage is perfect throughout the building.',
      service: 'Network Installation',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'David Thompson',
      location: 'Home Office',
      rating: 5,
      text: 'My gaming PC build exceeded all expectations! The cable management is pristine and the performance is incredible. Worth every penny.',
      service: 'Custom PC Build',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Jennifer Park',
      location: 'Medical Office',
      rating: 5,
      text: 'They recovered critical patient data from our crashed server. Professional handling of sensitive information and excellent communication throughout the process.',
      service: 'Data Recovery',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Robert Williams',
      location: 'Homeowner',
      rating: 5,
      text: 'Fixed my water-damaged iPhone when others said it was hopeless. Not only did they repair it, but it works better than before! Highly recommend.',
      service: 'Mobile Repair',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const stats = [
    { number: '4.9', label: 'Average Rating', suffix: '/5' },
    { number: '500+', label: 'Happy Customers', suffix: '' },
    { number: '98%', label: 'Success Rate', suffix: '' },
    { number: '24hr', label: 'Response Time', suffix: '' }
  ];

  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Customer <span className="text-green-600">Reviews</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers 
            have to say about our electronics services.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src={review.avatar} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-600">{review.location}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="relative mb-4">
                <Quote className="h-6 w-6 text-green-200 absolute -top-2 -left-1" />
                <p className="text-gray-700 leading-relaxed pl-4">{review.text}</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  {review.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-green-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Join Our Satisfied Customers</h3>
            <p className="text-green-100 mb-6">
              Experience the same quality service that earned us these amazing reviews.
            </p>
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Schedule Service Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;