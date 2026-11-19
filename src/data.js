
// Adds the correct image folder path for local development and deployment.
const imagePath = (path) => `${import.meta.env.BASE_URL}${path}`;

export const artists = [
  {
    id: 1,
    name: "Lali Baslandze",
    nameKA: "ლალი ბასლანძე",
    image: imagePath("images/artists/lali-baslandze.png"),
  },
  {
    id: 2,
    name: "Lika Baslandze",
    nameKA: "ლიკა ბასლანძე",
    image: "",
  },
];

export const artworks = [
  {
    id: 1,
    title: "Wildflower Milk Can",
    titleKA: "ველური ყვავილები რძის ჭურჭელში",
    description:
      "Crisp white daisies with deep crimson centers and delicate bluebell blooms spill out of a rustic white milk container against a weathered wooden backdrop. A serene, rustic still life celebrating simple natural beauty.",
    descriptionKA:
      "თეთრი გვირილები მუქი წითელი გულებითა და ნაზი ცისფერი ყვავილები ძველებური თეთრი რძის ჭურჭლიდან გადმოედინება. ხის გაცვეთილი ფონით შექმნილი მშვიდი ნატურმორტი ბუნებრივ სილამაზეს წარმოაჩენს.",
    artistId: 1,
    year: 2023,
    image: imagePath("images/artworks/artwork-1.JPEG"),
    medium: "Oil on canvas panel",
    mediumKA: "ზეთი ტილოს პანელზე",
    width: 30,
    height: 40,
    unit: "cm",
    price: 360,
    currency: "EUR",
  },
  {
    id: 2,
    title: "Amber Still Life",
    titleKA: "ქარვისფერი ნატურმორტი",
    description:
      "Warm, glowing amber liquor in an embossed glass bottle paired with a half-cut lemon, a glass, star anise, and cinnamon sticks. Rich tones and tactile textures evoke a quiet, reflective mood.",
    descriptionKA:
      "თბილი, მბზინავი ქარვისფერი სასმელი ორნამენტებიან მინის ბოთლში, რომელსაც თან ახლავს გაჭრილი ლიმონი, ჭიქა, ვარსკვლავა ანისი და დარიჩინის ჩხირები. მდიდარი ფერები და ფაქტურები მშვიდ, ჩაფიქრებულ განწყობას ქმნის.",
    artistId: 1,
    year: 2024,
    image: imagePath("images/artworks/artwork-2.JPEG"),
    medium: "Oil on canvas panel",
    mediumKA: "ზეთი ტილოს პანელზე",
    width: 30,
    height: 30,
    unit: "cm",
    price: 270,
    currency: "EUR",
  },
  {
    id: 3,
    title: "Pussy Willow Still Life",
    titleKA: "ტირიფის ტოტების ნატურმორტი",
    description:
      "An oil still life pairing a rustic terracotta vase holding flowering pussy willow branches with a larger weathered blue-green ceramic vessel behind it. Soft lavender-pink buds and scattered petals on the tabletop bring texture and quiet spring color against a rough, painterly backdrop.",
    descriptionKA:
      "ზეთის საღებავით შესრულებული ნატურმორტი: ტერაკოტის ვაზაში მოთავსებული ყვავილოვანი ტირიფის ტოტები და მის უკან განთავსებული დიდი, ლურჯ-მწვანე კერამიკული ჭურჭელი. ნაზი იასამნისფერი და ვარდისფერი კვირტები და მაგიდაზე მიმოფანტული ფურცლები გაზაფხულის მშვიდ ფერებსა და ფაქტურას ქმნის.",
    artistId: 1,
    year: 2024,
    image: imagePath("images/artworks/artwork-3.JPEG"),
    medium: "Oil on canvas",
    mediumKA: "ზეთი ტილოზე",
    width: 40,
    height: 50,
    unit: "cm",
    price: 600,
    currency: "EUR",
  },
  {
    id: 4,
    title: "Ruby Seeds",
    titleKA: "ლალისფერი მარცვლები",
    description:
      "A bold, dramatic still life featuring a whole pomegranate paired with a sliced seed-rich wedge against a dark, moody backdrop. Deep reds and jewel tones highlight the fruit's rich texture.",
    descriptionKA:
      "გამომსახველობითი და დრამატული ნატურმორტი, რომელშიც მთლიანი ბროწეული და მისი გაჭრილი, მარცვლებით სავსე ნაჭერია წარმოდგენილი მუქ ფონზე. ღრმა წითელი და ძვირფასი ქვების მსგავსი ტონები ნაყოფის მდიდარ ფაქტურას უსვამს ხაზს.",
    artistId: 1,
    year: 2024,
    image: imagePath("images/artworks/artwork-4.JPEG"),
    medium: "Oil on canvas panel",
    mediumKA: "ზეთი ტილოს პანელზე",
    width: 30,
    height: 30,
    unit: "cm",
    price: 270,
    currency: "EUR",
  },
  {
    id: 5,
    title: "Pastel Meadow at Dusk",
    titleKA: "პასტელური მდელო მწუხრისას",
    description:
      "A tranquil landscape of an open field flanked by two trees, rendered in soft greens with a sky washed in blush pink and lavender. The loose, atmospheric brushwork evokes the hush of early morning or fading evening light.",
    descriptionKA:
      "მშვიდი პეიზაჟი ღია მინდვრითა და მის ორივე მხარეს მდგარი ხეებით. ნაზი მწვანე ტონები, ვარდისფერი და იასამნისფერი ცა ქმნის დილის სიწყნარის ან ჩამავალი მზის სინათლის განწყობას.",
    artistId: 1,
    year: 2026,
    image: imagePath("images/artworks/artwork-5.JPEG"),
    medium: "Oil on canvas panel",
    mediumKA: "ზეთი ტილოს პანელზე",
    width: 30,
    height: 40,
    unit: "cm",
    price: 290,
    currency: "EUR",
  },
  {
    id: 6,
    title: "Magnolia Blossoms",
    titleKA: "მაგნოლიის ყვავილები",
    description:
      "Elegant magenta magnolia blossoms reach upward against a soft, ethereal background of cool blues and purples. Rich highlights on the petals create a striking sense of depth, warmth, and grace.",
    descriptionKA:
      "ელეგანტური მეწამული მაგნოლიის ყვავილები ზემოთ იშლება ლურჯი და იასამნისფერი ტონების ნაზ, ჰაეროვან ფონზე. ფურცლებზე სინათლის მკვეთრი აქცენტები სიღრმის, სითბოსა და სინატიფის შეგრძნებას ქმნის.",
    artistId: 1,
    year: 2026,
    image: imagePath("images/artworks/artwork-6.JPEG"),
    medium: "Oil on canvas",
    mediumKA: "ზეთი ტილოზე",
    width: 20,
    height: 40,
    unit: "cm",
    price: 350,
    currency: "EUR",
  },
  {
    id: 7,
    title: "Solitary Bloom",
    titleKA: "მარტოსული ყვავილი",
    description:
      "A vibrant, magenta-pink blossom stands gracefully in a clear glass vase against a washed turquoise canvas. Dynamic, visible brushstrokes and luminous petals bring a fresh, modern energy to this intimate floral portrait.",
    descriptionKA:
      "ნათელი მეწამულ-ვარდისფერი ყვავილი გამჭვირვალე მინის ვაზაში, ფერმკრთალი ფირუზისფერი ფონის წინ. დინამიკური, ხილული ფუნჯის მონასმები და მბზინავი ფურცლები ამ ყვავილოვან კომპოზიციას სიახლესა და თანამედროვე ენერგიას სძენს.",
    artistId: 1,
    year: 2024,
    image: imagePath("images/artworks/artwork-7.JPEG"),
    medium: "Oil on canvas",
    mediumKA: "ზეთი ტილოზე",
    width: 30,
    height: 40,
    unit: "cm",
    price: 420,
    currency: "EUR",
  },
  {
    id: 8,
    title: "Peonies in Brass Pitcher",
    titleKA: "პიონები სპილენძის დოქში",
    description:
      "Lush, layered peonies in shades of cream, blush, and soft coral gathered in a warm brass pitcher. Set against a soft, golden-sepia background, this classic still life radiates quiet warmth and timeless elegance.",
    descriptionKA:
      "კრემისფერი, ნაზი ვარდისფერი და მარჯნისფერი პიონები თბილი ოქროსფერი ლითონის დოქშია მოთავსებული. რბილი ოქროსფერ-სეპიისფერი ფონის ფონზე ეს კლასიკური ნატურმორტი სიმშვიდეს, სითბოსა და მარადიულ ელეგანტურობას გამოხატავს.",
    artistId: 1,
    year: 2024,
    image: imagePath("images/artworks/artwork-8.JPEG"),
    medium: "Oil on canvas panel",
    mediumKA: "ზეთი ტილოს პანელზე",
    width: 30,
    height: 40,
    unit: "cm",
    price: 460,
    currency: "EUR",
  },
];
