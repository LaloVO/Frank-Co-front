import React from 'react';
import { Link } from 'react-router-dom';
import {
    Building2,
    MapPin,
    TrendingUp,
    Clock,
    ChevronRight,
    Heart,
    Share2,
    Grid2X2,
    Pool,
    Dumbbell,
    Shield,
    Wifi,
    Wind,
    Download,
    Phone,
    MessageSquare,
    ArrowRight,
    Maximize2,
    BedDouble,
    Bath,
    FileText,
    LineChart,
    UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

const PropertyDetail = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#231f20] font-sans">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 md:px-10 py-4 shadow-sm border-b border-gray-100">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <Building2 className="size-8 text-[#002d43]" />
                    <h2 className="text-[#002d43] text-xl font-bold uppercase tracking-tight">
                        Premium <span className="text-[#867027]">Estates</span>
                    </h2>
                </Link>

                <nav className="hidden lg:flex items-center gap-8">
                    <Link to="/propiedades" className="text-sm font-semibold text-[#002d43] hover:text-[#867027] transition-colors">Marketplace</Link>
                    <Link to="/listings" className="text-sm font-semibold text-[#002d43] hover:text-[#867027] transition-colors">Portfolio</Link>
                    <Link to="/listings" className="text-sm font-semibold text-[#002d43] hover:text-[#867027] transition-colors">Insights</Link>
                    <Button variant="default" className="bg-[#002d43] hover:bg-[#867027] font-bold h-10 px-6">
                        Sign In
                    </Button>
                </nav>
            </header>

            <main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                    <Link to="/listings" className="hover:text-[#002d43]">Invest</Link>
                    <ChevronRight className="size-3" />
                    <Link to="/propiedades" className="hover:text-[#002d43]">Polanco</Link>
                    <ChevronRight className="size-3" />
                    <span className="text-[#867027]">Skyline Penthouse</span>
                </nav>

                {/* Heading */}
                <div className="flex flex-wrap justify-between items-end gap-6 mb-8">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-[#002d43] text-3xl md:text-5xl font-extrabold tracking-tight">The Grand Marina Penthouse</h1>
                        <div className="flex items-center gap-3 text-gray-500">
                            <MapPin className="size-5 text-[#867027]" />
                            <p className="font-medium">123 Ocean Drive, Marina District, San Diego, CA</p>
                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold">VERIFIED</Badge>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center justify-center size-11 rounded-full border border-gray-200 hover:bg-gray-50 text-[#002d43] transition-colors">
                            <Heart className="size-5" />
                        </button>
                        <button className="flex items-center justify-center size-11 rounded-full border border-gray-200 hover:bg-gray-50 text-[#002d43] transition-colors">
                            <Share2 className="size-5" />
                        </button>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[500px] mb-10 rounded-2xl overflow-hidden shadow-lg border border-white">
                    <div className="col-span-1 md:col-span-2 row-span-2 relative group cursor-pointer overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#002d43]/60 to-transparent" />
                    </div>
                    <div className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1600566753190-17f0bcd7a6d4?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden backdrop-blur-sm">
                        <img src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden text-white">
                        <img src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-[#002d43]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="font-bold flex items-center gap-2 tracking-widest uppercase text-xs">
                                <Grid2X2 className="size-4" /> View All Photos
                            </span>
                        </div>
                    </div>
                    <div className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6f3ea?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>

                {/* Highlight Stats Bar */}
                <div className="bg-[#002d43] text-white rounded-2xl p-8 flex flex-wrap justify-between items-center gap-8 shadow-2xl mb-12 border border-white/10">
                    <div className="flex flex-col gap-1">
                        <p className="text-[#867027] text-[10px] uppercase font-black tracking-[0.2em]">Listing Price</p>
                        <p className="text-4xl font-black tabular-nums">$1,250,000 <span className="text-xl font-medium text-white/50">USD</span></p>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden lg:block" />
                    <div className="flex flex-col gap-1 text-center lg:text-left">
                        <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em]">Total Size</p>
                        <p className="text-2xl font-bold">2,400 <span className="text-sm font-medium text-white/40">sqft</span></p>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden lg:block" />
                    <div className="flex flex-col gap-1 text-center lg:text-left">
                        <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em]">Layout</p>
                        <p className="text-2xl font-bold">3 Bed / 3.5 Bath</p>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden lg:block" />
                    <div className="flex flex-col gap-1 text-center lg:text-left">
                        <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em]">Status</p>
                        <div className="flex items-center gap-2 justify-center lg:justify-start">
                            <Clock className="size-5 text-[#867027]" />
                            <p className="text-2xl font-bold text-[#867027] uppercase tracking-tighter">Pre-sale</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
                    {/* Main Info - Left */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-16">
                        <section>
                            <h3 className="text-[#002d43] text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-[#867027]" /> Property Overview
                            </h3>
                            <div className="text-gray-600 leading-relaxed space-y-6 text-lg">
                                <p>
                                    Experience luxury living in this exclusive penthouse. Featuring floor-to-ceiling windows, a private terrace, and state-of-the-art smart home integration. Located in the heart of the financial district, this property offers both lifestyle and strong asset appreciation potential.
                                </p>
                                <p>
                                    The open-concept design seamlessly blends indoor and outdoor living, perfect for entertaining or enjoying quiet sunsets over the marina. High-end finishes include Italian marble countertops, custom cabinetry, and premium hardwood flooring throughout.
                                </p>
                            </div>
                            <Button variant="link" className="p-0 h-auto text-[#867027] font-bold mt-8 flex items-center gap-1">
                                Read full detailed report <ArrowRight className="size-4" />
                            </Button>
                        </section>

                        <section>
                            <h3 className="text-[#002d43] text-2xl font-bold mb-8">Premium Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10">
                                {[
                                    { icon: Maximize2, label: 'Infinity Pool' },
                                    { icon: Dumbbell, label: 'Private Gym' },
                                    { icon: Shield, label: '24/7 Security' },
                                    { icon: Wifi, label: 'Fiber Wifi' },
                                    { icon: Wind, label: 'Central A/C' },
                                    { icon: BedDouble, label: 'Private Lift' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col gap-4">
                                        <div className="size-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#867027] transform -rotate-3 hover:rotate-0 transition-transform">
                                            <item.icon className="size-7" />
                                        </div>
                                        <span className="font-bold text-[#002d43]/70">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-[#002d43] text-2xl font-bold">Market Location</h3>
                                <span className="text-xs font-black text-[#867027] uppercase tracking-[0.2em]">San Diego • Marina District</span>
                            </div>
                            <div className="h-96 w-full rounded-2xl bg-gray-200 overflow-hidden relative border-8 border-white shadow-xl">
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover grayscale brightness-50" />
                                <div className="absolute inset-0 bg-[#002d43]/10" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="bg-[#867027] text-white p-4 rounded-full shadow-2xl animate-bounce">
                                        <MapPin className="size-8" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="pb-12">
                            <h3 className="text-[#002d43] text-2xl font-bold mb-8">Investment Documentation</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: 'Property Prospectus 2024', size: '12.4 MB', type: 'PDF' },
                                    { name: 'Asset Valuation Report', size: '2.8 MB', type: 'PDF' },
                                ].map((doc, i) => (
                                    <div key={i} className="group p-5 bg-white rounded-xl border border-gray-100 hover:border-[#867027] transition-all cursor-pointer flex items-center justify-between shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-lg bg-[#002d43]/5 flex items-center justify-center text-[#002d43]">
                                                <FileText className="size-6" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#002d43] group-hover:text-[#867027] transition-colors">{doc.name}</p>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{doc.type} • {doc.size}</p>
                                            </div>
                                        </div>
                                        <Download className="size-5 text-gray-300 group-hover:text-[#867027]" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sticky Hub - Right */}
                    <aside className="lg:col-span-5 xl:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 ring-1 ring-[#002d43]/5">
                                <div className="bg-[#002d43] p-6 text-white flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="size-5 text-[#867027]" />
                                        <span className="font-bold tracking-tight uppercase text-sm">Investment Hub</span>
                                    </div>
                                    <Badge className="bg-[#867027] font-black tracking-widest text-[10px]">ANALYSIS PRO</Badge>
                                </div>

                                <div className="grid grid-cols-2 border-b border-gray-50">
                                    <div className="p-6 text-center border-r border-gray-50">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Annual ROI</p>
                                        <p className="text-3xl font-black text-[#002d43] tabular-nums">12.4%</p>
                                    </div>
                                    <div className="p-6 text-center">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cap Rate</p>
                                        <p className="text-3xl font-black text-[#867027] tabular-nums">6.8%</p>
                                    </div>
                                </div>

                                <div className="p-8 space-y-10">
                                    <div className="flex items-center bg-[#F8FAFC] p-1 rounded-xl">
                                        <button className="flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all rounded-lg bg-white shadow-sm text-[#002d43]">Mortgage</button>
                                        <button className="flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all rounded-lg text-gray-400 hover:text-[#002d43]">Cash Flow</button>
                                        <button className="flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all rounded-lg text-gray-400 hover:text-[#002d43]">Taxes</button>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center px-1">
                                                <span className="text-xs font-black uppercase text-[#002d43]/50 tracking-widest">Down Payment</span>
                                                <span className="text-sm font-black text-[#002d43]">20% ($250k)</span>
                                            </div>
                                            <Slider defaultValue={[20]} max={100} step={1} className="text-[#002d43]" />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center px-1">
                                                <span className="text-xs font-black uppercase text-[#002d43]/50 tracking-widest">Interest Rate</span>
                                                <span className="text-sm font-black text-[#002d43]">4.5%</span>
                                            </div>
                                            <Slider defaultValue={[45]} max={100} step={1} />
                                        </div>
                                    </div>

                                    <div className="bg-[#002d43] p-6 rounded-2xl text-white flex justify-between items-center group cursor-pointer hover:bg-[#002d43]/95 transition-all">
                                        <div>
                                            <p className="text-[10px] font-black text-[#867027] uppercase tracking-widest">Est. Monthly Output</p>
                                            <p className="text-2xl font-black">$4,280 <span className="text-xs font-medium text-white/40">/mo</span></p>
                                        </div>
                                        <ArrowRight className="size-6 text-[#867027] group-hover:translate-x-2 transition-transform" />
                                    </div>

                                    <Button className="w-full h-16 bg-[#867027] hover:bg-[#8f7927] text-white font-black uppercase tracking-[0.2em] shadow-xl text-xs rounded-2xl">
                                        Schedule Advisor Call
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-full bg-gray-200" />
                                    <div>
                                        <p className="font-bold text-[#002d43]">Sarah Jenkins</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Senior Portfolio Lead</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-3 bg-[#F8FAFC] rounded-xl text-[#002d43] hover:bg-[#002d43] hover:text-white transition-all"><MessageSquare className="size-5" /></button>
                                    <button className="p-3 bg-[#F8FAFC] rounded-xl text-[#002d43] hover:bg-[#002d43] hover:text-white transition-all"><Phone className="size-5" /></button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="mt-auto bg-[#002d43] text-white py-16">
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <Building2 className="size-6 text-[#867027]" />
                        <span className="text-xl font-bold uppercase tracking-widest">Premium Estates</span>
                    </div>
                    <div className="flex gap-12 text-xs font-black uppercase tracking-widest text-white/30">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Ethics</a>
                        <a href="#" className="hover:text-white transition-colors">Risk</a>
                    </div>
                    <p className="text-[10px] font-medium text-white/20">© 2024 PrimeEstates Global Group. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PropertyDetail;