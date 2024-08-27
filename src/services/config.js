const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export const apiUrlUser = `${backendUrl}/api/user`;
export const apiUrlSpecies = `${backendUrl}/api/petSpecies`;
export const apiUrlBreeds = `${backendUrl}/api/petBreed`;
export const apiUrlPets = `${backendUrl}/api/pets`;
export const apiUrlCategory = `${backendUrl}/api/cate`;
export const apiUrlBrand = `${backendUrl}/api/brand`;
export const apiUrlProduct = `${backendUrl}/api/product`;
export const apiUrlNews = `${backendUrl}/api/news`;
export const apiUrlChat = `${backendUrl}/api/chat`;
export const apiUrlMess = `${backendUrl}/api/mess`;
