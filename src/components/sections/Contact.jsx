// src/components/sections/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "hello@gamedev.com",
      link: "mailto:hello@gamedev.com"
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "linkedin.com/in/gamedev",
      link: "https://linkedin.com/in/gamedev"
    },
    {
      icon: "🐙",
      title: "GitHub",
      value: "github.com/gamedev",
      link: "https://github.com/gamedev"
    },
    {
      icon: "🐦",
      title: "Twitter",
      value: "@gamedev",
      link: "https://twitter.com/gamedev"
    }
  ];

  return (
    <section id="contact" className="py-20" style={{background: 'linear-gradient(to bottom right, #222831, #1a1f28)'}}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Get In <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(to right, #FF9B17, #FFD63A)', WebkitBackgroundClip: 'text'}}>Touch</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-300">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6" style={{color: '#222831'}}>
                Send Me a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#222831'}}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{focusRingColor: '#FF9B17'}}
                    onFocus={(e) => e.target.style.borderColor = '#FF9B17'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#222831'}}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                    onFocus={(e) => e.target.style.borderColor = '#FF9B17'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#222831'}}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                    onFocus={(e) => e.target.style.borderColor = '#FF9B17'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    placeholder="Project Discussion"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: '#222831'}}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 resize-none"
                    onFocus={(e) => e.target.style.borderColor = '#FF9B17'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
                >
                  Send Message 🚀
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Let's Connect
                </h3>
                <p className="text-gray-300 mb-8">
                  I'm always excited to work on new projects and collaborate with creative minds. 
                  Whether you have a game idea, need animation work, or want to build something amazing together, 
                  feel free to reach out!
                </p>
              </div>

              {/* Contact Methods */}
              <div className="grid gap-4">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.link}
                    className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-2xl mr-4">{contact.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white">{contact.title}</h4>
                      <p className="text-gray-300">{contact.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-2">
                  📅 Availability
                </h4>
                <p className="text-gray-300">
                  Currently open for freelance projects and collaborations. 
                  Typical response time: 24-48 hours.
                </p>
              </div>

              {/* Fun Fact */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-2">
                  🎮 Fun Fact
                </h4>
                <p className="text-gray-300">
                  I debug code better with coffee and lo-fi music. 
                  Currently working on a side project that combines AI and game mechanics!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;