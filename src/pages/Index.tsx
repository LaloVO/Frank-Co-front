import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Search,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowRight,
  Menu,
  Star,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f8] font-sans">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white/95 border-b border-[#f0f3f5] px-6 md:px-10 py-4 shadow-sm backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="size-8 text-[#002d43]" />
          <h2 className="text-[#002d43] text-xl font-bold uppercase tracking-tight">
            Premium <span className="text-[#867027]">Estates</span>
          </h2>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-[#002d43] hover:text-[#867027] transition-colors">Financial Services</a>
          <Link to="/propiedades" className="text-sm font-medium text-[#002d43] hover:text-[#867027] transition-colors">Real Estate</Link>
          <Link to="/listings" className="text-sm font-medium text-[#002d43] hover:text-[#867027] transition-colors">Investments</Link>
          <a href="#" className="text-sm font-medium text-[#002d43] hover:text-[#867027] transition-colors">Infonavit</a>
          <a href="#" className="text-sm font-medium text-[#002d43] hover:text-[#867027] transition-colors">Testimonials</a>
          <Button variant="default" className="bg-[#002d43] hover:bg-[#867027] transition-all">
            Contact
          </Button>
        </nav>

        <button className="lg:hidden text-[#002d43]">
          <Menu className="size-8" />
        </button>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[650px] md:h-[800px] flex items-center justify-center overflow-hidden">
          {/* Hero Carousel Background using CSS animation */}
          <div className="hero-bg absolute inset-0 z-0 bg-gray-200" />
          <div className="absolute inset-0 bg-[#002d43]/40 z-0" />

          <div className="relative z-10 w-full max-w-7xl px-4 md:px-10 flex flex-col items-center gap-8 text-center pt-20">
            <h1 className="text-white text-4xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
              Invest in Your <span className="text-[#867027]">Legacy</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl drop-shadow-md">
              Exclusive properties and integrated financial services for high-trust decisions.
            </p>

            {/* Filter Card */}
            <div className="mt-8 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-4xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="flex flex-col gap-2 text-left">
                  <span className="text-[#002d43] text-xs font-bold uppercase tracking-wider">Location</span>
                  <select className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm transition-focus w-full">
                    <option>Polanco, CDMX</option>
                    <option>Lomas de Chapultepec</option>
                    <option>Santa Fe</option>
                    <option>San Pedro Garza García</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <span className="text-[#002d43] text-xs font-bold uppercase tracking-wider">Operation</span>
                  <select className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm transition-focus w-full">
                    <option>Buy</option>
                    <option>Rent</option>
                    <option>Invest</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <span className="text-[#002d43] text-xs font-bold uppercase tracking-wider">Type</span>
                  <select className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm transition-focus w-full">
                    <option>Penthouse</option>
                    <option>Mansion</option>
                    <option>Apartment</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <Button className="h-[46px] bg-[#002d43] hover:bg-[#867027] text-white font-bold gap-2 w-full">
                  <Search className="size-5" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="bg-[#f5f7f8] py-20 px-4 md:px-10 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-[#002d43] mb-6">Why Choose Us</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We bridge the gap between luxury real estate and financial strategy. Our integrated approach ensures your property isn't just a home, but a high-performing asset in your portfolio.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#002d43]/10 p-3 rounded-full text-[#002d43]">
                  <ShieldCheck className="size-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#231f20]">Secure Investments</h3>
                  <p className="text-sm text-gray-500">High-trust legal vetting.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#002d43]/10 p-3 rounded-full text-[#002d43]">
                  <TrendingUp className="size-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#231f20]">Market Analysis</h3>
                  <p className="text-sm text-gray-500">Data-driven valuations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-24 px-4 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl font-bold text-[#002d43]">Featured Properties</h2>
                <p className="text-gray-500 mt-2">Curated selection of premium listings available now.</p>
              </div>
              <Link to="/propiedades" className="hidden md:flex items-center gap-2 text-[#867027] font-bold hover:underline">
                View All Properties <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Property 1 */}
              <Link to="/propiedad/1" className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute top-3 left-3 bg-[#002d43]/90 text-white text-xs font-bold px-2 py-1 rounded z-10">FOR SALE</div>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZlTh41QW2LEMLPwyA_TJ8wLy0LaTzkbDuhKiyJrCGMbhzpI_Tr44-2AYhKdww6XiGMZvPUhwwvIhuuZeLqZbNBlbv4D9_qbIOko6HjVsTBHzu52iBYM0Tre9M-9rkUvB6yfWp5XF68mYOE_VpvPrf08DVJ2CtRfKqJGGRKtajKfcv8HYrI0azm-s5WTkVStNQt3l6f7oNfLc9O_Hse3cH-SgV2E7JKiDQ9Qawb-0c9qHPsto7FvGwhPRZivAHdVoqkZhVhl4pHA"
                    alt="Skyline Penthouse"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-lg font-bold">Skyline Penthouse</p>
                    <p className="text-gray-200 text-sm flex items-center gap-1"><MapPin className="size-3" /> Polanco, CDMX</p>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#867027] text-xl font-bold">$1,250,000 USD</span>
                  </div>
                  <div className="flex gap-4 text-gray-500 text-sm mb-4 border-b border-gray-100 pb-4">
                    <span className="flex items-center gap-1"><Bed className="size-4" /> 3</span>
                    <span className="flex items-center gap-1"><Bath className="size-4" /> 3.5</span>
                    <span className="flex items-center gap-1"><Square className="size-4" /> 240m²</span>
                  </div>
                  <div className="mt-auto">
                    <Button variant="outline" className="w-full border-[#002d43] text-[#002d43] hover:bg-[#002d43] hover:text-white transition-colors">View Details</Button>
                  </div>
                </div>
              </Link>

              {/* Property 2 */}
              <Link to="/propiedad/2" className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute top-3 left-3 bg-[#002d43]/90 text-white text-xs font-bold px-2 py-1 rounded z-10">FOR SALE</div>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1HwqPJTZm-FMMxgUbD-3Hds4TR3G9DMRhEK2rXIWZlyLGhL9sEGEaIo5IIwhBa1W6pL7I0i9Yk_mj-XY8hebtt_HgQ-WHDW0uap0somNqXw_HxFkBqlN8QGtKvn2ssta7GI5JOxaTGFd1JicHrwiNvau490bgzW84BSNLmhDQkIn2Bufis-M5trlXXZaYWFR5sEV3ztfZp6hOb0qY5g0A16sF8PZvxXr-mTPT3TC-_fQvkMTBZ-9VZ7iV5jCqA6oXNbonIt2NTQ"
                    alt="Lomas Manor"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-lg font-bold">Lomas Manor</p>
                    <p className="text-gray-200 text-sm flex items-center gap-1"><MapPin className="size-3" /> Lomas de Chapultepec</p>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#867027] text-xl font-bold">$2,800,000 USD</span>
                  </div>
                  <div className="flex gap-4 text-gray-500 text-sm mb-4 border-b border-gray-100 pb-4">
                    <span className="flex items-center gap-1"><Bed className="size-4" /> 5</span>
                    <span className="flex items-center gap-1"><Bath className="size-4" /> 6</span>
                    <span className="flex items-center gap-1"><Square className="size-4" /> 550m²</span>
                  </div>
                  <div className="mt-auto">
                    <Button variant="outline" className="w-full border-[#002d43] text-[#002d43] hover:bg-[#002d43] hover:text-white transition-colors">View Details</Button>
                  </div>
                </div>
              </Link>

              {/* Property 3 */}
              <Link to="/propiedad/3" className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute top-3 left-3 bg-[#867027] text-white text-xs font-bold px-2 py-1 rounded z-10">FOR RENT</div>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0qIHVIqWxApqfGBx4-Qz7sa7E0hx3uH-DhnIlqS2LD_MeocYcgeYsCE5tCeKxQjM5B20_jyTPmZa6n3GJ5SBzFnto5vYB-aEywttQ5XBDX7Grm89p3ssYojUuNjykMstT4ftJ8sSPdr8D01DwnZZhO5q-wjFBaJtHwTAvrX35U313hbpo5-wXim2FBHWwH8Pg2obQQjEhFRjQe8jsqtCxY0cgBR-Bj394hgyrLUtQZ9qPRR7gcxnle4N1QIEzolqABtG3yTtBlg"
                    alt="Santa Fe Loft"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-lg font-bold">Santa Fe Loft</p>
                    <p className="text-gray-200 text-sm flex items-center gap-1"><MapPin className="size-3" /> Santa Fe, CDMX</p>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#867027] text-xl font-bold">$4,500 USD/mo</span>
                  </div>
                  <div className="flex gap-4 text-gray-500 text-sm mb-4 border-b border-gray-100 pb-4">
                    <span className="flex items-center gap-1"><Bed className="size-4" /> 2</span>
                    <span className="flex items-center gap-1"><Bath className="size-4" /> 2</span>
                    <span className="flex items-center gap-1"><Square className="size-4" /> 120m²</span>
                  </div>
                  <div className="mt-auto">
                    <Button variant="outline" className="w-full border-[#002d43] text-[#002d43] hover:bg-[#002d43] hover:text-white transition-colors">View Details</Button>
                  </div>
                </div>
              </Link>

              {/* Property 4 */}
              <Link to="/propiedad/4" className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute top-3 left-3 bg-[#002d43]/90 text-white text-xs font-bold px-2 py-1 rounded z-10">FOR SALE</div>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwzI1rN1ENwocTnkJLwXTzDsaepzGAod-ITmic9tAdwdfipvij959SA3qN7uF7D09Sn9joBTskM2JjqpjaCCwl49OrPL2QzwF54gQuENUTBvY4W7KvMi9WUZcyJJ5IQA3Rpwoc1K_0MDzMQnY2MYsnswFNHhAO6n-lY6L1TxJScdZgE5DhSzsJJBuOTxqQJckT5wXb7sXExf8fxM4I1QE3arLUbHtLv4hvK4MewZjmsAgs7jawiaRtWEmHXULrr7pTRCG_QMc_DA"
                    alt="San Pedro Estate"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-lg font-bold">San Pedro Estate</p>
                    <p className="text-gray-200 text-sm flex items-center gap-1"><MapPin className="size-3" /> San Pedro, NL</p>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#867027] text-xl font-bold">$3,100,000 USD</span>
                  </div>
                  <div className="flex gap-4 text-gray-500 text-sm mb-4 border-b border-gray-100 pb-4">
                    <span className="flex items-center gap-1"><Bed className="size-4" /> 4</span>
                    <span className="flex items-center gap-1"><Bath className="size-4" /> 5</span>
                    <span className="flex items-center gap-1"><Square className="size-4" /> 480m²</span>
                  </div>
                  <div className="mt-auto">
                    <Button variant="outline" className="w-full border-[#002d43] text-[#002d43] hover:bg-[#002d43] hover:text-white transition-colors">View Details</Button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" className="border-2 border-[#002d43] text-[#002d43] hover:bg-[#002d43] hover:text-white font-bold gap-2">
                Browse All Listings
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[#f5f7f8] py-20 px-4 md:px-10 overflow-hidden border-t border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-extrabold text-[#002d43] mb-4 leading-tight">
                Trusted by <br /> <span className="text-[#867027]">Visionaries</span>
              </h2>
              <p className="text-gray-600 mb-8">
                We've helped over 500 high-net-worth individuals find their perfect property match and secure their financial legacy.
              </p>
              <div className="flex gap-4">
                <button className="size-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#002d43] hover:text-white hover:border-[#002d43] transition-colors text-gray-600">
                  <ChevronLeft className="size-5" />
                </button>
                <button className="size-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#002d43] hover:text-white hover:border-[#002d43] transition-colors text-gray-600">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>

            {/* Vertical Auto-Scroll Carousel Mockup */}
            <div className="md:w-2/3 h-[400px] relative overflow-hidden mask-linear-fade">
              <div className="flex flex-col gap-6 animate-scroll-vertical">
                {/* Testimonial 1 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex text-[#867027] mb-4">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="size-4 fill-current" />)}
                  </div>
                  <p className="text-lg text-[#231f20] italic mb-6">"The financial guidance was as exceptional as the property itself. They understood exactly what I needed for my portfolio."</p>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gray-300 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-HAC1qUl_y5MSwozEhCTxwyhkLZ45fDorpQojPN_w9izPLJ3MuSTlbYzk2sc-ihRIue-dvhDyy73r_1wu4kHIWk5ULaYg_aTe2mNx8pH6YMkd37vWwvO4IQ7s6UrxDghNwJJ2Z8AtKrBbSXyIptNGcA-kTcyC7r7rNqOMWKrpmASYiJSULCPRQk3ZXeCm-0H6FJIiDtWIpOnMKNoc6GWBtkX-UnL0CjFg-bxisxIx5UDUltNKTnBp8aWe_1IVuQ10f1jpMROPNQ')" }} />
                    <div>
                      <p className="text-sm font-bold text-[#002d43]">Carlos Rodriguez</p>
                      <p className="text-xs text-gray-500">Real Estate Investor</p>
                    </div>
                  </div>
                </div>
                {/* Testimonial 2 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex text-[#867027] mb-4">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="size-4 fill-current" />)}
                  </div>
                  <p className="text-lg text-[#231f20] italic mb-6">"Finding a penthouse in Polanco that met my security and luxury standards was impossible until I met this team."</p>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gray-300 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYJJ0TD8OHRbNg9XnUZziYnYJeu1swZgKPP-8KdluAMz2kJHS4tRq-qIK2uO9Rocf_2CON7hvZqJt6mzIjvfJu-MWaEitjWIJe_VppINIznAVJTKkgDScsTF44rXdCSfRUCPYcIZCOvW8nxiObN-bVxyXhGRooYKjVl4xgSfaS2xJPu8kf89WNeLxIkyhp7y0EtS2J9Q1Un-cI7Gdluhtz7qBlsD1_kTMhnCXOPf4jUK0RZUwBQlayl2CxQU4-c1CyrhgrBiYs-g')" }} />
                    <div>
                      <p className="text-sm font-bold text-[#002d43]">Sofia Mendez</p>
                      <p className="text-xs text-gray-500">Business Owner</p>
                    </div>
                  </div>
                </div>
                {/* Testimonial 3 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex text-[#867027] mb-4">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="size-4 fill-current" />)}
                  </div>
                  <p className="text-lg text-[#231f20] italic mb-6">"Seamless process from the initial viewing to the final signature. Highly recommended for high-trust transactions."</p>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gray-300 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuuMo6_bpLhMgRyPNDbHx_1Gi09yoA6xG-E4jTOYyvu62D_v9NbbVmHRyrtPMkCqEzxsG8MxR_oCvDT8X5QT3BMG6Mg8U23NRDgxH3IxM3QOAHVMIW6sTqz3fobZcsw2ju3nEaDpQ1emLYi7eJ-w1AADPagHkDUX6mT9if2Dv1RQ7uEALmzUifeFbm8F3rvI2gecgF4-gTHywqAaD1tz_opW8gPEaSxF86AE1FbWui8DjRi5Vw-97-NKTblRpKBgx8R9FEfEmj1Q')" }} />
                    <div>
                      <p className="text-sm font-bold text-[#002d43]">David Cohen</p>
                      <p className="text-xs text-gray-500">Architect</p>
                    </div>
                  </div>
                </div>
                {/* Duplicate Testimonials for infinite scroll illusion if needed, but CSS handles standard duration. 
                      Ideally we duplicate the content to ensure smooth loop without gap */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex text-[#867027] mb-4">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="size-4 fill-current" />)}
                  </div>
                  <p className="text-lg text-[#231f20] italic mb-6">"The financial guidance was as exceptional as the property itself. They understood exactly what I needed for my portfolio."</p>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gray-300 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-HAC1qUl_y5MSwozEhCTxwyhkLZ45fDorpQojPN_w9izPLJ3MuSTlbYzk2sc-ihRIue-dvhDyy73r_1wu4kHIWk5ULaYg_aTe2mNx8pH6YMkd37vWwvO4IQ7s6UrxDghNwJJ2Z8AtKrBbSXyIptNGcA-kTcyC7r7rNqOMWKrpmASYiJSULCPRQk3ZXeCm-0H6FJIiDtWIpOnMKNoc6GWBtkX-UnL0CjFg-bxisxIx5UDUltNKTnBp8aWe_1IVuQ10f1jpMROPNQ')" }} />
                    <div>
                      <p className="text-sm font-bold text-[#002d43]">Carlos Rodriguez</p>
                      <p className="text-xs text-gray-500">Real Estate Investor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#002d43] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                <Building2 className="size-6 text-[#867027]" />
                <span className="text-xl font-bold tracking-tight uppercase text-white">Premium <span className="text-[#867027]">Estates</span></span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Providing exclusive access to the world's most prestigious properties combined with top-tier financial strategy.
              </p>
              <div className="flex gap-4">
                <Facebook className="size-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                <Instagram className="size-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                <Twitter className="size-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Explore</h4>
              <ul className="space-y-4 text-sm text-gray-300">
                <li><a href="#" className="hover:text-[#867027] transition-colors">Residential</a></li>
                <li><a href="#" className="hover:text-[#867027] transition-colors">Commercial</a></li>
                <li><a href="#" className="hover:text-[#867027] transition-colors">New Developments</a></li>
                <li><a href="#" className="hover:text-[#867027] transition-colors">Featured Listings</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-sm text-gray-300">
                <li><a href="#" className="hover:text-[#867027] transition-colors">Financial Consulting</a></li>
                <li><a href="#" className="hover:text-[#867027] transition-colors">Property Management</a></li>
                <li><a href="#" className="hover:text-[#867027] transition-colors">Legal Assistance</a></li>
                <li><a href="#" className="hover:text-[#867027] transition-colors">Infonavit Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates on exclusive off-market listings.</p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-[#003855] border-none rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-[#867027]"
                />
                <Button className="bg-[#867027] text-white font-bold py-3 px-4 rounded-lg text-sm hover:bg-[#9a8130] transition-colors uppercase tracking-wide w-full">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">© 2024 Premium Estates. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;