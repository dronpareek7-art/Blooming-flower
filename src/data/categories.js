import bouquetImage from "../assets/images/category-bouquets.png";
import rosesImage from "../assets/images/category-roses.png";
import orchidsImage from "../assets/images/category-orchids.png";
import plantsImage from "../assets/images/category-plants.png";
import hampersImage from "../assets/images/category-gift-hampers.png";
import occasionImage from "../assets/images/category-occasion.png";

const categories = [
  {
    id: 1,
    name: "Bouquets",
    slug: "bouquets",
    image: bouquetImage,
    eyebrow: "MADE TO IMPRESS",
    description:
      "Thoughtfully arranged blooms for celebrations, surprises, and everyday happiness.",
    count: "Fresh floral arrangements",
  },
  {
    id: 2,
    name: "Roses",
    slug: "roses",
    image: rosesImage,
    eyebrow: "TIMELESS ROMANCE",
    description:
      "Classic roses in beautiful colors, perfect for expressing love and appreciation.",
    count: "Classic favorites",
  },
  {
    id: 3,
    name: "Orchids",
    slug: "orchids",
    image: orchidsImage,
    eyebrow: "NATURAL ELEGANCE",
    description:
      "Graceful orchid blooms that bring an elegant touch to thoughtful gifts and interiors.",
    count: "Elegant blooms",
  },
  {
    id: 4,
    name: "Plants",
    slug: "plants",
    image: plantsImage,
    eyebrow: "GROW SOMETHING LOVELY",
    description:
      "Bring a little greenery into your space with plants for home, work, and gifting.",
    count: "Green living",
  },
  {
    id: 5,
    name: "Gift Hampers",
    slug: "gift-hampers",
    image: hampersImage,
    eyebrow: "A GIFT WITH HEART",
    description:
      "Thoughtful gift combinations designed to make the people you love feel special.",
    count: "Beautifully bundled",
  },
  {
    id: 6,
    name: "Occasion",
    slug: "occasion",
    image: occasionImage,
    eyebrow: "CELEBRATE EVERY MOMENT",
    description:
      "Find flowers and gifts for birthdays, anniversaries, milestones, and just-because moments.",
    count: "Made for memories",
  },
];

export default categories;