import ReduxProvider from "../component/providers/Redux";
import "./layout.css";

export async function generateMetadata({ params, searchParams }) {
  const baseUrl = "https://shoesstore-ten.vercel.app";

  return {
    title: "Trang Chủ - Pet Shop",
    description:
      "Chào mừng đến với cửa hàng bán thú cưng chính hãng. Chúng tôi cung cấp thú cưng chất lượng cao với giá tốt nhất.",
    alternates: {
      canonical: baseUrl,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: "Trang Chủ - Pet Shop",
      description:
        "Chào mừng đến với cửa hàng bán thú cưng chính hãng. Chúng tôi cung cấp thú cưng chất lượng cao với giá tốt nhất.",
      url: baseUrl,
      siteName: "Pet Shop",
      images: [
        {
          url: "https://res.cloudinary.com/dq1bmcdyc/image/upload/v1722946177/imageLogin_ktbiup.png",
        },
      ],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
