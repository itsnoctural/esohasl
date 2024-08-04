export async function uploadWithUrl(url: string, path: string) {
  const image = await fetch(url);
  return await upload(await image.arrayBuffer(), `${path}`);
}

export async function uploadWithFile(file: File, path: string) {
  return upload(await file.arrayBuffer(), `${path}`);
}

async function upload(arrayBuffer: ArrayBuffer, path: string) {
  return await fetch(`${Bun.env.BUNNYNET_STORAGE}/${path}`, {
    method: "PUT",
    headers: {
      AccessKey: Bun.env.BUNNYNET_ACCESSKEY,
      "Content-Type": "application/octet-stream",
    },
    body: arrayBuffer,
  });
}

export async function deleteFile(folder: string, name: string) {
  return await fetch(`${Bun.env.BUNNYNET_STORAGE}/${folder}/${name}`, {
    method: "DELETE",
    headers: { AccessKey: Bun.env.BUNNYNET_ACCESSKEY },
  });
}
