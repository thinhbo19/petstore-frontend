import { getCurrentPetsByName } from "@/src/services/apiPet";
import { getCurrentProdByName } from "@/src/services/apiProduct";
import formatPetName from "@/src/services/formatPetName";
import { generateSlug } from "@/src/services/slugifyConfig";

function stripHtmlTags(html) {
  return html.replace(/<\/?[^>]+>/gi, "");
}

export async function generateMetadata({ params, searchParams }) {
  const { productName } = params;
  const prodData = await getCurrentProdByName(formatPetName(productName));

  const baseUrl = "https://petstore-theta.vercel.app";
  const prodUrl = `${baseUrl}/accessory/${generateSlug(
    prodData.category.nameCate
  )}/${productName}`;

  const maxDescriptionLength = 180;

  const description = stripHtmlTags(prodData?.description || "");
  const shortDescription =
    description.length > maxDescriptionLength
      ? description.slice(0, maxDescriptionLength) + "..."
      : description;
  return {
    title: `${prodData?.nameProduct} - Pet Shop`,
    description: shortDescription,
    alternates: {
      canonical: prodUrl,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: `${prodData?.nameProduct} - Pet Shop`,
      description: shortDescription,
      url: prodUrl,
      siteName: "Website for Pets",
      images: [
        {
          url: prodData?.images[0],
          alt: prodData?.nameProduct,
        },
      ],
    },
  };
}

export default function DetailProdsLayout({ children }) {
  return <>{children}</>;
}
