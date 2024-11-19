export async function generateMetadata({ params, searchParams }) {
  const baseUrl = "https://petstore-theta.vercel.app";
  const petUrl = `${baseUrl}/accessory`;

  const description = `There are all kinds of species here`;

  return {
    title: `Accessories - Pet Shop`,
    description: description,
    alternates: {
      canonical: petUrl,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: `Shop - Pet Shop`,
      description: description,
      url: petUrl,
      siteName: "Website for Pets",
      images: [
        {
          url: "../../../../public/dog.jpg",
          alt: "Shop",
        },
      ],
    },
  };
}

export default function SpeciesLayout({ children }) {
  return <>{children}</>;
}
