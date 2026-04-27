import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import BlogClient from './BlogClient';

export const metadata = { title: 'Blog' };

export default async function BlogPage() {
  const posts = await api.blog.list().catch(() => []);
  return (
    <div>
      <TopBar title="Blog" />
      <div className="p-6">
        <BlogClient initial={posts} />
      </div>
    </div>
  );
}
