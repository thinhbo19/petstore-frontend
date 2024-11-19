import { getAllBreeds } from "@/src/services/apiPet";
import { generateSlug } from "@/src/services/slugifyConfig";

const formatPetName = (slug) => {
  const words = slug.split("-");

  const formattedWords = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedWords;
};

export async function generateMetadata({ params, searchParams }) {
  const { breedName } = params;

  const breedData = await getAllBreeds();
  const matchedBreed = breedData.find(
    (breed) => breed.nameBreed === formatPetName(breedName)
  );

  const baseUrl = "https://petstore-theta.vercel.app";
  const petUrl = `${baseUrl}/shop/${generateSlug(
    matchedBreed.petSpecies.nameSpecies
  )}/${generateSlug(matchedBreed.nameBreed)}`;

  const description = `There are all kinds of ${breedName} here`;

  return {
    title: `${formatPetName(breedName)}s - Pet Shop`,
    description: description,
    alternates: {
      canonical: petUrl,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: `All of ${breedName} - Pet Shop`,
      description: description,
      url: petUrl,
      siteName: "Website for Pets",
      images: [
        {
          url: matchedBreed.imgBreed[0],
          alt: breedName,
        },
      ],
    },
  };
}

export default function BreedLayout({ children }) {
  return <>{children}</>;
}
