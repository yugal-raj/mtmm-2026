export default function PlacesToVisit(){
    const places = [
    {
      title: "Kaziranga National Park",
      description: (<>
      <p>
      Kaziranga National Park, located about 45 km from Tezpur, is one of India’s
most iconic wildlife destinations and a UNESCO World Heritage Site.
Renowned worldwide for conserving the largest population of the endangered
one-horned rhinoceros, Kaziranga stands as a global symbol of successful
wildlife protection. The park spans vast stretches of tall elephant grass,
wetlands, and riverine forests shaped by the dynamic Brahmaputra
floodplains, creating a unique and breathtaking landscape.
</p>
<p className="pt-2">
Kaziranga is home to an extraordinary diversity of fauna, including Asian
elephants, wild water buffaloes, swamp deer, and Royal Bengal tigers, along
with over 480 species of resident and migratory birds. Guided jeep safaris and
elephant rides provide visitors with immersive experiences, offering close
encounters with wildlife in their natural habitat.
</p>
<p className="pt-2">
Beyond its ecological importance, Kaziranga offers a rare opportunity to
witness pristine wilderness, making it an unforgettable destination for nature
enthusiasts, photographers, and conservation-minded travellers.
</p>
</>),
    },
    {
      title: "Nameri National Park",
      description: (<>
      Nameri National Park, located about 35 km from Tezpur, is renowned for its serene
natural beauty and rich biodiversity. Situated along the Jia Bhoroli River, the park is a
popular destination for birdwatching, river rafting, and nature trekking, and is home to
diverse wildlife including elephants, deer, and rare bird species. Its peaceful, less
crowded environment makes Nameri an ideal eco-tourism spot for experiencing
Assam’s pristine forests and riverine landscapes.
</>),
    },
    {
      title: "Orang National Park",
      description: (<>
      Orang National Park, located about 70 km from Tezpur, is popularly known as “Mini
Kaziranga” for its rich wildlife and similar natural landscape. Nestled along the banks
of the Brahmaputra River, the park shelters iconic wildlife such as the one-horned
rhinoceros, elephants, deer, and a wide variety of bird species, providing visitors with
a serene and less crowded wildlife experience through guided jeep safaris across its
expansive grasslands and tranquil wetlands.
</>),
    },
    {
      title: "Agnigarh Hill (Tezpur)",
      description: (<>
      Agnigarh Hill is a historic and cultural landmark in the heart of Tezpur, closely linked
to the legendary love story of Usha and Aniruddha from Assamese mythology.
Adorned with sculptures and landscaped gardens illustrating the legend, the hill
overlooks the Brahmaputra River and offers stunning panoramic views. Easily
accessible from the town center, Agnigarh Hill symbolizes Tezpur’s rich heritage and
serves as a popular destination for cultural appreciation and brief visits.
      </>),
    },
    {
      title: "Mahabhairab Temple (Tezpur)",
      description: (<>
      <p>
      The Mahabhairab Temple, located in Tezpur, is one of the oldest and most revered
Shiva temples in Assam. Believed to have origins dating back to ancient times, the
temple is an important spiritual center and a key part of the region’s religious
heritage.
</p>
<p className="pt-2">
Perched on a hilltop, the Mahabhairav Temple attracts devotees from across Assam,
particularly during major Hindu festivals. The serene surroundings and panoramic
views of the town create a peaceful spiritual ambiance, while the temple’s historical
and cultural significance make it a key destination for those interested in Assam’s
religious traditions and architectural heritage.
</p>
      </>),
    },
    {
      title: "Bhalukpong",
      description: (
        <>
        Bhalukpong, located around 60 km from Tezpur, is a scenic town at the Assam–Arunachal
Pradesh border. Surrounded by hills, forests, and rivers, it serves as a gateway to Arunachal
Pradesh. The Kameng River flowing through the area offers opportunities for river rafting
and nature photography. Bhalukpong is also known for its pleasant climate, lush greenery,
and tranquil environment. The town is ideal for short excursions, especially for visitors
interested in exploring hill landscapes and experiencing the natural beauty of Northeast India.
        </>
      ),
    }
  ];
    return (
        <div className="w-[80vw]"
            style={{
                maxWidth:"1280px"
            }}
        >
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >Places To Visit</h2>
            <ol className="list-decimal ml-6 space-y-6 marker:text-[#01419f] font-semibold text-lg">
        {places.map((place, index) => (
          <li key={index}>
            <h3 className="font-semibold text-lg mb-2 text-[#01419f] mt-5">{place.title}:</h3>
            <div className="text-black text-justify text-[16px]"
              style={{
                fontWeight: 400
              }}
            >{place.description}</div>
          </li>
        ))}
      </ol>
            <p className="pt-2 text-justify" 
                style={{"color":"black"}}
            ></p>
        </div>
    )
}