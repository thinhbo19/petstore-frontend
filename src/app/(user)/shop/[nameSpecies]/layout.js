import { generateSlug } from "@/src/services/slugifyConfig";

export async function generateMetadata({ params, searchParams }) {
  const { nameSpecies } = params;

  const baseUrl = "https://petstore-theta.vercel.app";
  const petUrl = `${baseUrl}/shop/${generateSlug(nameSpecies)}`;

  const description = `There are all kinds of ${nameSpecies} here`;

  return {
    title: `All of ${nameSpecies}s - Pet Shop`,
    description: description,
    alternates: {
      canonical: petUrl,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: `All of ${nameSpecies} - Pet Shop`,
      description: description,
      url: petUrl,
      siteName: "Website for Pets",
      images: [
        {
          url: "../../../../../public/dog.jpg",
          alt: nameSpecies,
        },
      ],
    },
  };
}

export default function SpeciesLayout({ children }) {
  return <>{children}</>;
}
