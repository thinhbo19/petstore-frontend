// formatPetName.js
export default function formatPetName(slug) {
  const words = slug.split("-"); // Tách chuỗi thành mảng các từ bằng cách sử dụng dấu "-"
  const lastWord = words.pop(); // Lấy từ cuối cùng ra khỏi mảng

  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  ); // Viết hoa chữ cái đầu của các từ còn lại

  const formattedString = [...formattedWords, lastWord.toUpperCase()].join(" "); // Ghép các từ lại với nhau, từ cuối cùng được viết hoa hoàn toàn

  return formattedString;
}
