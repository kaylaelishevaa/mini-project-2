export default function Narration() {
  return (
    <section>
      <div className="bg-red-900 min-h-72">
        <div className="text-white text-3xl font-bold text-center bg-red-900 pt-10 ">
          <h1>Don't Worry About Money: Enjoy Free Events!</h1>
        </div>
        <div className="p-14 flex flex-row justify-around gap-8">
          {/* Community Festivals Box */}
          <div className=" text-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-2">Community Festivals</h2>
            <p>
              Many neighborhoods host annual festivals that celebrate local
              culture, food, and music. These events often feature live
              performances, art displays, and activities for all ages.
            </p>
          </div>

          {/* Outdoor Concerts Box */}
          <div className=" text-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-2">Outdoor Concerts</h2>
            <p>
              During the warmer months, parks and public spaces frequently host
              free concerts. These events allow you to enjoy live music while
              soaking up the sun with friends and family.
            </p>
          </div>

          {/* Art Exhibitions Box */}
          <div className=" text-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-2">Art Exhibitions</h2>
            <p>
              Local galleries and museums often have free admission days or
              special events where you can explore art without any cost. This is
              a fantastic way to appreciate creativity and perhaps even discover
              a new favorite artist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
