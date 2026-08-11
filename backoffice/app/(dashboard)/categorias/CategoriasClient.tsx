'use client';
import { useState, useTransition } from 'react';
import type { Category } from '@/lib/types';
import Button from '@/components/Button';
import { createCategoryAction, updateCategoryAction, deleteCategoryAction, reorderCategoriesAction } from '@/lib/actions';

function CategoryRow({
  category, index, total, indent, onMove, onRenamed, onToggled, onDeleted,
}: {
  category: Category;
  index: number;
  total: number;
  indent: boolean;
  onMove: (dir: -1 | 1) => void;
  onRenamed: (c: Category) => void;
  onToggled: (c: Category) => void;
  onDeleted: () => void;
}) {
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(category.name);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  function saveRename() {
    if (!name.trim() || name === category.name) { setRenaming(false); setName(category.name); return; }
    startTransition(async () => {
      try {
        const updated = await updateCategoryAction(category.id, { name: name.trim() });
        onRenamed(updated as Category);
        setRenaming(false);
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  function toggleActive() {
    startTransition(async () => {
      const updated = await updateCategoryAction(category.id, { isActive: !category.isActive });
      onToggled(updated as Category);
    });
  }

  function handleDelete() {
    if (!confirm(`Apagar "${category.name}"? Esta ação não se pode desfazer.`)) return;
    startTransition(async () => {
      try {
        await deleteCategoryAction(category.id);
        onDeleted();
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  const nServices = category._count?.services ?? 0;

  return (
    <div className={`flex items-center gap-3 bg-bg-card border border-gold-border/30 rounded-lg px-4 py-3 ${indent ? 'ml-8' : ''}`}>
      <div className="flex gap-1 flex-shrink-0">
        <button
          type="button" onClick={() => onMove(-1)} disabled={index === 0}
          aria-label="Mover para cima"
          className="w-7 h-7 flex items-center justify-center rounded border border-gold-border/30 text-gold disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gold-muted transition-colors text-sm"
        >↑</button>
        <button
          type="button" onClick={() => onMove(1)} disabled={index === total - 1}
          aria-label="Mover para baixo"
          className="w-7 h-7 flex items-center justify-center rounded border border-gold-border/30 text-gold disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gold-muted transition-colors text-sm"
        >↓</button>
      </div>

      <div className="flex-1 min-w-0">
        {renaming ? (
          <div className="flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveRename()}
              autoFocus
              className="bg-bg-section border border-gold-border/30 rounded px-2 py-1 text-sm text-text-primary flex-1"
            />
            <Button size="sm" onClick={saveRename} loading={isPending}>Guardar</Button>
            <Button size="sm" variant="outline" onClick={() => { setRenaming(false); setName(category.name); }}>Cancelar</Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {indent && <span className="text-text-muted text-xs">↳</span>}
            <span className={`text-sm ${category.isActive ? 'text-text-primary' : 'text-text-muted'}`}>{category.name}</span>
            <span className="text-text-muted text-xs">/{category.slug}</span>
            <span className="text-text-muted text-xs">· {nServices} serviço{nServices !== 1 ? 's' : ''}</span>
            {!category.isActive && <span className="text-amber-400 text-xs">Desativada</span>}
          </div>
        )}
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>

      {!renaming && (
        <div className="flex gap-2 flex-shrink-0">
          <Button size="sm" variant="outline" onClick={() => setRenaming(true)}>Renomear</Button>
          <Button size="sm" variant={category.isActive ? 'danger' : 'gold'} onClick={toggleActive} disabled={isPending}>
            {category.isActive ? 'Desativar' : 'Ativar'}
          </Button>
          <Button size="sm" variant="danger" onClick={handleDelete} disabled={isPending}>Apagar</Button>
        </div>
      )}
    </div>
  );
}

function NewCategoryForm({ parent, onCreated }: { parent?: Category; onCreated: (c: Category) => void }) {
  const [name, setName] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  function handleCreate() {
    if (!name.trim()) return;
    startTransition(async () => {
      try {
        const created = await createCategoryAction(name.trim(), parent?.id);
        onCreated(created as Category);
        setName('');
        setError('');
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  return (
    <div className={parent ? 'ml-8' : ''}>
      <div className="flex items-center gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          placeholder={parent ? `Subcategoria em ${parent.name}` : 'Ex.: Pacotes'}
          className="bg-bg-section border border-gold-border/30 rounded px-3 py-2 text-sm text-text-primary flex-1"
        />
        <Button onClick={handleCreate} loading={isPending}>{parent ? '+ Subcategoria' : 'Criar'}</Button>
      </div>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}

export default function CategoriasClient({ initial }: { initial: Category[] }) {
  const [categories, setCategories] = useState(initial);

  const topLevel = categories.filter((c) => c.parentId === null).sort((a, b) => a.sortOrder - b.sortOrder);
  const childrenOf = (parentId: number) =>
    categories.filter((c) => c.parentId === parentId).sort((a, b) => a.sortOrder - b.sortOrder);

  function moveWithinSiblings(list: Category[], index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= list.length) return;
    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    reorderCategoriesAction(next.map((c) => c.id));
    setCategories((prev) => {
      const ids = new Set(next.map((c) => c.id));
      const rest = prev.filter((c) => !ids.has(c.id));
      return [...rest, ...next];
    });
  }

  function upsert(updated: Category) {
    setCategories((prev) => prev.map((c) => c.id === updated.id ? { ...c, ...updated } : c));
  }

  function remove(id: number) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="max-w-2xl space-y-8">
      <p className="text-text-secondary text-sm">
        Estas categorias organizam o catálogo público (<code>/servicos</code>) e o menu do site.
        Cada categoria pode ter subcategorias — por exemplo, dentro de Barbearia: Barba, Cabelo, Barba + Cabelo, Pack Premium.
        Usa as setas para as ordenar como devem aparecer.
      </p>

      <div className="space-y-3">
        {topLevel.map((cat, i) => {
          const children = childrenOf(cat.id);
          return (
            <div key={cat.id} className="space-y-2">
              <CategoryRow
                category={cat}
                index={i}
                total={topLevel.length}
                indent={false}
                onMove={(dir) => moveWithinSiblings(topLevel, i, dir)}
                onRenamed={upsert}
                onToggled={upsert}
                onDeleted={() => remove(cat.id)}
              />
              {children.map((child, j) => (
                <CategoryRow
                  key={child.id}
                  category={child}
                  index={j}
                  total={children.length}
                  indent
                  onMove={(dir) => moveWithinSiblings(children, j, dir)}
                  onRenamed={upsert}
                  onToggled={upsert}
                  onDeleted={() => remove(child.id)}
                />
              ))}
              <NewCategoryForm parent={cat} onCreated={(c) => setCategories((prev) => [...prev, c])} />
            </div>
          );
        })}
      </div>

      <div className="bg-bg-card border border-gold-border/30 rounded-lg p-4">
        <h2 className="text-text-primary font-medium text-sm mb-3">Nova categoria de topo</h2>
        <NewCategoryForm onCreated={(c) => setCategories((prev) => [...prev, c])} />
      </div>
    </div>
  );
}
