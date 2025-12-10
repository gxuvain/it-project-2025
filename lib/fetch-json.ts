export async function fetchJson<T = unknown>(path: string): Promise<T> {
  const res = await fetch(path);

  if (!res.ok) {
    throw new Error(`Error fetching (${res.status}): ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
