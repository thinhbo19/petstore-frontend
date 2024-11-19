const formatPetName = (slug) => {
  const words = slug.split("-");

  const formattedWords = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedWords;
};

export async function generateMetadata({ params, searchParams }) {
  const { category } = params;

  const baseUrl = "https://petstore-theta.vercel.app";
  const petUrl = `${baseUrl}/accessory/${category}`;
  const description = `There are all kinds  of accessories about ${category}`;

  return {
    title: `${formatPetName(category)} - Pet Shop`,
    description: description,
    alternates: {
      canonical: petUrl,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: `${formatPetName(category)} - Pet Shop`,
      description: description,
      url: petUrl,
      siteName: "Website for Pets",
      images: [
        {
          url: "../../../../../public/dog.jpg",
          alt: "Shop",
        },
      ],
    },
  };
}

export default function SpeciesLayout({ children }) {
  return <>{children}</>;
}
