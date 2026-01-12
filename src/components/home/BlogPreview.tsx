import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockBlogPosts } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function BlogPreview() {
  const posts = mockBlogPosts.slice(0, 8);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Centro <span className="gold-gradient-text">Educativo</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Aprende sobre inversión inmobiliaria con nuestros expertos
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="mt-4 md:mt-0 text-primary hover:text-primary/80"
            asChild
          >
            <Link to="/hub" className="flex items-center">
              Ver todo el contenido
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              to={`/hub/${post.id}`}
              className={cn(
                "group bg-card rounded-lg overflow-hidden border border-border",
                "hover:border-primary/50 transition-all duration-300 hover:shadow-gold",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Category */}
                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                  {post.category}
                </span>

                {/* Title */}
                <h3 className="text-base font-semibold text-foreground mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{post.readTime} min</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
