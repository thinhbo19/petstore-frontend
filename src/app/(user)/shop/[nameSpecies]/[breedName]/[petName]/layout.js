import { getCurrentPetsByName } from "@/src/services/apiPet";
import formatPetName from "@/src/services/formatPetName";
import { generateSlug } from "@/src/services/slugifyConfig";

function stripHtmlTags(html) {
  return html.replace(/<\/?[^>]+>/gi, "");
}

export async function generateMetadata({ params, searchParams }) {
  const { petName } = params;
  const petData = await getCurrentPetsByName(formatPetName(petName));

  const baseUrl = "https://petstore-theta.vercel.app";
  const petUrl = `${baseUrl}/shop/${generateSlug(
    petData.pet.petBreed.nameSpecies
  )}/${generateSlug(petData.pet.petBreed.nameBreed)}/${petName}`;

  const maxDescriptionLength = 180;

  const description = stripHtmlTags(petData?.pet.description || "");
  const shortDescription =
    description.length > maxDescriptionLength
      ? description.slice(0, maxDescriptionLength) + "..."
      : description;
  return {
    title: `${petData?.pet.namePet} - Pet Shop`,
    description: shortDescription,
    alternates: {
      canonical: petUrl,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: `${petData?.pet.namePet} - Pet Shop`,
      description: shortDescription,
      url: petUrl,
      siteName: "Website for Pets",
      images: [
        {
          url: petData?.pet.imgPet[0],
          alt: petData?.pet.namePet,
        },
      ],
    },
  };
}

export default function DetailPetsLayout({ children }) {
  return <>{children}</>;
}
