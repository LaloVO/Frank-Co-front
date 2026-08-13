import { MessageCircle } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

export function WhatsAppButton() {
  const { user } = useSiteUser();

  const handleClick = () => {
    if (user?.telefono_usuario) {
      const waNumber = user.telefono_usuario.replace(/\D/g, '');
      window.open(`https://wa.me/${waNumber}`, '_blank', 'noopener,noreferrer');
    }
  };

  if (!user?.telefono_usuario) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
    </button>
  );
}
