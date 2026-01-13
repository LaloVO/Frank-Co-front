import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Building2,
    Search,
    MapPin,
    User,
    Bell,
    Bookmark,
    ChevronDown,
    X,
    Plus,
    Minus,
    LocateFixed,
    Layers,
    Pencil,
    Menu,
    Apartment
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Properties = () => {
    const [activeProperty, setActiveProperty] = useState<number | null>(null);

    const properties = [
        {
            id: 1,
            name: "The Kensington Lofts",
            address: "142 Kensington High St, London",
            price: "$1,200,000",
            size: "2,400 sqft",
            priceSqft: "$500/sqft",
            yield: "4.5% Yield",
            type: "Resi",
            image: "https://images.unsplash.com/photo-1600596542815-e32870110044?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Financial District Office",
            address: "88 Wall St, New York",
            price: "$3,500,000",
            size: "5,500 sqft",
            priceSqft: "$636/sqft",
            yield: "6.1% Yield",
            type: "Comm",
            exclusive: true,
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Harbor View Complex",
            address: "200 Bay St, Toronto",
            price: "$8,500,000",
            size: "24 Units",
            priceSqft: "Fully Leased",
            yield: "5.8% Yield",
            type: "Multi",
            image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <div className="flex flex-col h-screen bg-white text-[#231f20] overflow-hidden">
            {/* Top Navigation Bar */}
            <header className="flex shrink-0 items-center justify-between bg-[#002d43] px-6 py-3 z-50 shadow-md">
                <Link to="/" className="flex items-center gap-4 text-white hover:opacity-90 transition-opacity">
                    <div className="size-8 flex items-center justify-center bg-white/10 rounded-lg text-[#867027]">
                        <Building2 className="size-5" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight uppercase">Premium <span className="text-[#867027]">Estates</span></h2>
                </Link>

                <div className="flex flex-1 justify-end gap-8">
                    <nav className="hidden md:flex items-center gap-9">
                        <Link to="/propiedades" className="text-white/90 hover:text-[#867027] text-sm font-medium transition-colors">Marketplace</Link>
                        <Link to="/listings" className="text-white/70 hover:text-[#867027] text-sm font-medium transition-colors">Portfolio</Link>
                        <Link to="/listings" className="text-white/70 hover:text-[#867027] text-sm font-medium transition-colors">Insights</Link>
                    </nav>

                    <div className="flex gap-3">
                        <Button className="bg-[#867027] hover:bg-[#8f7927] text-white font-bold h-9">
                            Connect
                        </Button>
                        <button className="flex size-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                            <Bell className="size-5" />
                        </button>
                        <button className="flex size-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                            <User className="size-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Left Panel: List View */}
                <aside className="w-full lg:w-[450px] xl:w-[500px] shrink-0 flex flex-col bg-white border-r border-[#f0f3f5] h-full shadow-xl z-20">
                    {/* Filters Header */}
                    <div className="flex flex-col border-b border-[#f0f3f5] bg-white sticky top-0 z-30">
                        <div className="px-5 pt-6 pb-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                <Input
                                    className="pl-10 bg-gray-50 border-gray-200 focus:ring-[#002d43] focus:border-[#002d43]"
                                    placeholder="City, Zip, or Asset Name"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 px-5 pb-5 overflow-x-auto no-scrollbar">
                            <button className="flex h-8 shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 px-3 transition-colors text-xs font-semibold">
                                Price Range <ChevronDown className="size-4 text-gray-400" />
                            </button>
                            <button className="flex h-8 shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 px-3 transition-colors text-xs font-semibold">
                                Asset Type <ChevronDown className="size-4 text-gray-400" />
                            </button>
                            <button className="flex h-8 shrink-0 items-center gap-2 rounded-lg border border-[#867027] bg-[#867027]/5 px-3 text-[#867027] text-xs font-semibold">
                                Yield {'>'} 5% <X className="size-4" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between px-5 py-3 bg-[#f8fafb] border-t border-[#f0f3f5]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">32 Properties Found</span>
                            <div className="flex items-center gap-1 cursor-pointer hover:text-[#002d43] transition-colors">
                                <span className="text-xs font-bold">Sort: Recommended</span>
                                <ChevronDown className="size-4" />
                            </div>
                        </div>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafb]">
                        {properties.map((prop) => (
                            <Link
                                to={`/propiedad/${prop.id}`}
                                key={prop.id}
                                className={`relative flex flex-col bg-white rounded-xl border transition-all cursor-pointer group ${prop.exclusive ? 'border-[#867027]/30 ring-1 ring-[#867027]/10' : 'border-gray-200 shadow-sm hover:shadow-md'}`}
                            >
                                {prop.exclusive && (
                                    <div className="absolute top-0 right-0 bg-[#867027] text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl z-10 tracking-widest uppercase">
                                        EXCLUSIVE
                                    </div>
                                )}
                                <div className="p-4 flex gap-4">
                                    <div className="relative w-32 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                        <img src={prop.image} alt={prop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold text-[#002d43] uppercase">
                                            {prop.type}
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between py-0.5">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-[#002d43] text-sm font-bold leading-tight group-hover:text-[#867027] transition-colors">{prop.name}</h3>
                                                <button className="text-gray-400 hover:text-[#867027] transition-colors">
                                                    <Bookmark className="size-4" />
                                                </button>
                                            </div>
                                            <p className="text-gray-500 text-[10px] mt-1 flex items-center gap-1">
                                                <MapPin className="size-3" /> {prop.address}
                                            </p>
                                        </div>
                                        <div className="flex items-end justify-between mt-2">
                                            <div>
                                                <p className="text-base font-extrabold text-[#143f61]">{prop.price}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">{prop.size} • {prop.priceSqft}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-[#867027]">{prop.yield}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Proj. ROI</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        <div className="pt-6 pb-8 text-center">
                            <button className="text-xs font-bold text-[#002d43] hover:text-[#867027] transition-colors flex items-center justify-center gap-1 mx-auto">
                                Load More Properties <ChevronDown className="size-4" />
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Right Panel: Map View */}
                <section className="flex-1 bg-slate-100 relative h-full">
                    {/* Placeholder for Map */}
                    <div className="w-full h-full bg-[#eef2f5] flex items-center justify-center relative overflow-hidden">
                        {/* Simulation of a Map with some markers */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=1200x800&key=')] bg-cover" />

                        {/* Map Controls */}
                        <div className="absolute top-6 right-6 flex flex-col gap-2">
                            <button className="size-10 bg-white rounded-lg shadow-lg hover:bg-gray-50 flex items-center justify-center text-[#002d43] transition-all">
                                <Plus className="size-5" />
                            </button>
                            <button className="size-10 bg-white rounded-lg shadow-lg hover:bg-gray-50 flex items-center justify-center text-[#002d43] transition-all">
                                <Minus className="size-5" />
                            </button>
                            <button className="size-10 mt-4 bg-white rounded-lg shadow-lg hover:bg-gray-50 flex items-center justify-center text-[#002d43] transition-all">
                                <LocateFixed className="size-5" />
                            </button>
                            <button className="size-10 bg-white rounded-lg shadow-lg hover:bg-gray-50 flex items-center justify-center text-[#002d43] transition-all">
                                <Layers className="size-5" />
                            </button>
                        </div>

                        {/* Custom Markers */}
                        <div className="absolute top-[40%] left-[45%] group cursor-pointer z-30">
                            <div className="relative flex flex-col items-center">
                                <div className="bg-[#867027] text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-1 ring-4 ring-white/30 transform hover:scale-110 transition-all">
                                    <span>$3.5M</span>
                                </div>
                                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#867027] -mt-[1px]"></div>

                                {/* Tooltip on Map */}
                                <div className="absolute bottom-full mb-4 w-60 bg-white rounded-xl shadow-2xl p-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 pointer-events-none">
                                    <div className="w-full h-24 bg-cover bg-center rounded-lg mb-3" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400&auto=format&fit=crop')" }}></div>
                                    <h4 className="font-bold text-[#002d43] text-sm mb-1">Financial District Office</h4>
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-gray-500 font-medium">5,500 sqft</span>
                                        <span className="text-[#867027] font-bold">6.1% Yield</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#002d43] text-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-[#867027] transition-all transform hover:-translate-y-1">
                            <Pencil className="size-5" />
                            <span className="text-sm font-bold uppercase tracking-widest">Draw Search Area</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Properties;