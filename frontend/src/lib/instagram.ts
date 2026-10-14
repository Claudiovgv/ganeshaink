export type InstagramPost = {
  id: string;
  href: string;
  src: string;
};

const PROFILE = 'https://www.instagram.com/ganeshainktattoostudio/';
const GRAPH = 'https://graph.instagram.com';

export const INSTAGRAM_PROFILE = PROFILE;

export const FALLBACK_INSTAGRAM_POSTS: InstagramPost[] = [
  { id: '01', src: '/images/instagram/01.jpg', href: `${PROFILE}reel/DYKEnfqCTKE/` },
  { id: '02', src: '/images/instagram/02.jpg', href: `${PROFILE}reel/DYrUBNqI59u/` },
  { id: '03', src: '/images/instagram/03.jpg', href: `${PROFILE}reel/DeFYTwkIW5T/` },
  { id: '04', src: '/images/instagram/04.jpg', href: `${PROFILE}reel/DeEQ2ijhqOW/` },
  { id: '05', src: '/images/instagram/05.jpg', href: `${PROFILE}reel/Dd4K-pAoqE4/` },
  { id: '06', src: '/images/instagram/06.jpg', href: `${PROFILE}reel/Ddi9K8-oE9P/` },
  { id: '07', src: '/images/instagram/07.jpg', href: `${PROFILE}reel/DdUdyeVoiQK/` },
  { id: '08', src: '/images/instagram/08.jpg', href: `${PROFILE}reel/DdBc7rmoqRv/` },
  { id: '09', src: '/images/instagram/09.jpg', href: `${PROFILE}reel/Dcx8SnOIlr3/` },
  { id: '10', src: '/images/instagram/10.jpg', href: `${PROFILE}reel/DcoKrCUIalj/` },
];

type GraphMedia = {
  id?: string;
  permalink?: string;
  media_url?: string;
  thumbnail_url?: string;
  media_type?: string;
};

type GraphList = {
  data?: GraphMedia[];
  error?: { message?: string };
};

async function graphGet<T>(path: string, token: string): Promise<T | null> {
  const url = path.startsWith('http')
    ? path
    : `${GRAPH}${path}${path.includes('?') ? '&' : '?'}access_token=${encodeURIComponent(token)}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

function toPost(item: GraphMedia, index: number): InstagramPost | null {
  const src = item.thumbnail_url || item.media_url;
  const href = item.permalink;
  if (!src || !href) return null;
  return { id: item.id ?? String(index), href, src };
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  if (!token) return FALLBACK_INSTAGRAM_POSTS;

  try {
    const direct = await graphGet<GraphList>(
      `/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&limit=10`,
      token,
    );
    const fromMe = (direct?.data ?? []).map(toPost).filter(Boolean) as InstagramPost[];
    if (fromMe.length > 0) return fromMe;

    const me = await graphGet<{ user_id?: string; id?: string }>(
      `/me?fields=user_id,id,username`,
      token,
    );
    const userId = me?.user_id || me?.id;
    if (!userId) return FALLBACK_INSTAGRAM_POSTS;

    const byId = await graphGet<GraphList>(
      `/${userId}/media?fields=id,media_type,media_url,thumbnail_url,permalink&limit=10`,
      token,
    );
    const posts = (byId?.data ?? []).map(toPost).filter(Boolean) as InstagramPost[];
    return posts.length > 0 ? posts : FALLBACK_INSTAGRAM_POSTS;
  } catch {
    return FALLBACK_INSTAGRAM_POSTS;
  }
}
