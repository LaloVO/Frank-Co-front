import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockVideos } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function VideoSection() {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Videos <span className="gold-gradient-text">Exclusivos</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Tours virtuales y contenido educativo de nuestros expertos
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="mt-4 md:mt-0 text-primary hover:text-primary/80"
            asChild
          >
            <Link to="/videos" className="flex items-center">
              Ver todos los videos
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockVideos.map((video, index) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group bg-background rounded-lg overflow-hidden border border-border",
                "hover:border-primary/50 transition-all duration-300 hover:shadow-gold",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center shadow-gold">
                    <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
