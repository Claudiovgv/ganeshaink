import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import CategoriasClient from './CategoriasClient';

export const metadata = { title: 'Categorias' };

export default async function CategoriasPage() {
  const categories = await api.categories.adminList().catch(() => []);
  return (
    <div>
      <TopBar title="Categorias" />
      <div className="p-6">
        <CategoriasClient initial={categories} />
      </div>
    </div>
  );
}
