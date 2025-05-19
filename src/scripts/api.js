export async function fetchAlbums() {
  try {
    const response = await fetch('https://openmusic-fake-api.onrender.com/api/musics');

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar álbuns da API:', error);
    return []; // Retorna array vazio em caso de erro para evitar falhas na renderização
  }
}
