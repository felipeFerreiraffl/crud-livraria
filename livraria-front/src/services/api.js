const API_URL = "http://localhost:8080/livraria";

export const getLivros = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao tentar buscar livros");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro no método GET: ", error);
    return null;
  }
};

export const createLivros = async (livro) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(livro),
    });

    if (!response.ok) {
      throw new Error("Erro ao tentar criar livros");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro no método POST: ", error);
    return null;
  }
};

export const updateLivros = async (id, livro) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(livro),
    });

    if (!response.ok) {
      throw new Error("Erro ao tentar atualizar livros");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro no método PUT: ", error);
    return null;
  }
};

export const deleteLivros = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao tentar deletar livros");
    }

    return true;
  } catch (error) {
    console.error("Erro no método DELETE: ", error);
    return false;
  }
};
