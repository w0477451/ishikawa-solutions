import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">JOIN US</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mt-4 mb-6">
                Take your business to <br/>
                the new level.
            </h2>
            <p className="text-gray-500">Join us and take your business to the next level with our affordable web development services.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-50 rounded-[2.5rem] p-8 md:p-12 shadow-inner relative">
            {/* Decorative doodle */}
            <div className="absolute -top-12 -right-12 md:-right-20 w-32 rotate-12 text-sm font-handwriting text-gray-600">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/1200px-Infobox_info_icon.svg.png" className="w-8 h-8 mb-2 opacity-20" alt="" />
                <span className="font-cursive transform rotate-12 block">get 3 months free support</span>
            </div>

            <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" className="w-full px-6 py-4 rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-300 outline-none" />
                    <input type="email" placeholder="Email" className="w-full px-6 py-4 rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-300 outline-none" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Phone Number" className="w-full px-6 py-4 rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-300 outline-none" />
                    <input type="text" placeholder="Company Name" className="w-full px-6 py-4 rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-300 outline-none" />
                </div>
                <select className="w-full px-6 py-4 rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-300 outline-none text-gray-500">
                    <option>Service Interested in</option>
                    <option>Web Development</option>
                    <option>Design</option>
                </select>
                <textarea placeholder="Message" rows={4} className="w-full px-6 py-4 rounded-2xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-300 outline-none"></textarea>
                
                <div className="text-center pt-4">
                    <button className="bg-blue-200 text-blue-700 font-bold px-12 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
                        Join!
                    </button>
                </div>
            </form>
        </div>
      </div>
    </section>
  );
};

export default CTA;
