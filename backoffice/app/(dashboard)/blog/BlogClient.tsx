'use client';
import { useState, useTransition } from 'react';
import type { BlogPost } from '@/lib/types';
import DataTable from '@/components/DataTable';
import Button from '@/components/Button';
import { createBlogPostAction, updateBlogPostAction, deleteBlogPostAction } from '@/lib/actions';
import { formatLisbon } from '@/lib/timezone';

const emptyPost = { title: '', slug: '', excerpt: '', content: '', coverImage: '', published: false };

export default function BlogClient({ initial }: { initial: BlogPost[] }) {
  const [posts, setPosts] = useState(initial);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyPost);
  const [isPending, startTransition] = useTransition();

  function openCreate() { setForm(emptyPost); setCreating(true); }
  function openEdit(post: BlogPost) {
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt ?? '', content: post.content, coverImage: post.coverImage ?? '', published: post.published });
    setEditing(post);
  }

  function handleSave() {
    startTransition(async () => {
      if (editing) {
        const updated = await updateBlogPostAction(editing.id, form) as BlogPost;
        setPosts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
        setEditing(null);
      } else {
        const created = await createBlogPostAction(form) as BlogPost;
        setPosts((prev) => [created, ...prev]);
        setCreating(false);
      }
    });
  }

  function handleDelete(id: number) {
    if (!confirm('Eliminar este post?')) return;
    startTransition(async () => {
      await deleteBlogPostAction(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    });
  }

  const columns = [
    { key: 'title', label: 'Título', render: (p: BlogPost) => <span className="font-medium">{p.title}</span> },
    { key: 'status', label: 'Estado', render: (p: BlogPost) => <span className={`text-xs font-medium ${p.published ? 'text-emerald-400' : 'text-text-muted'}`}>{p.published ? 'Publicado' : 'Rascunho'}</span> },
    { key: 'date', label: 'Data', render: (p: BlogPost) => <span className="text-text-secondary text-xs">{p.publishedAt ? formatLisbon(p.publishedAt, 'dd/MM/yyyy') : '—'}</span> },
    { key: 'author', label: 'Autor', render: (p: BlogPost) => <span className="text-text-secondary text-xs">{p.author?.name ?? '—'}</span> },
    {
      key: 'actions', label: 'Acções',
      render: (p: BlogPost) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => openEdit(p)}>Editar</Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)} disabled={isPending}>Eliminar</Button>
        </div>
      ),
    },
  ];

  const showForm = creating || editing !== null;

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={openCreate}>Novo Post</Button>
      </div>
      <DataTable columns={columns} data={posts} emptyMessage="Sem posts." />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 overflow-y-auto py-8">
          <div className="bg-bg-card border border-gold-border rounded-lg p-6 w-full max-w-2xl mx-4 space-y-4">
            <h2 className="font-display text-lg font-bold">{editing ? 'Editar Post' : 'Novo Post'}</h2>
            <div className="space-y-3">
              <input placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted" />
              <input placeholder="Slug (ex: o-meu-post)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted" />
              <input placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted" />
              <input placeholder="Cover image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted" />
              <textarea placeholder="Conteúdo (Markdown)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} className="w-full bg-bg-section border border-gold-border rounded px-3 py-2 text-text-primary text-sm placeholder-text-muted resize-y font-mono" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-gold" />
                <span className="text-sm text-text-secondary">Publicar imediatamente</span>
              </label>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleSave} disabled={!form.title || !form.slug || !form.content || isPending} loading={isPending}>Guardar</Button>
              <Button variant="outline" onClick={() => { setCreating(false); setEditing(null); }}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
