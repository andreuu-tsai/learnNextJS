export default function Page() {
  return (
    <div className="flex flex-col items-start">
      <section id="home" className="w-full">
        <h1 className="text-[64px] font-bold text-black">Interior Design</h1>
      </section>
      <section id="showcase" className="w-full">
        <h2 className="mb-4 mt-4 text-[48px] font-medium text-red-1">
          Showcase.
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <img src="/bedroom.jpg" alt="bedroom" className="h-auto w-full" />
          <img
            src="/dinningroom.jpg"
            alt="dinning room"
            className="h-auto w-full"
          />
          <img
            src="/livingroom.jpg"
            alt="livin groom"
            className="h-auto w-full"
          />
          <img
            src="/livingroom2.jpg"
            alt="livin groom"
            className="h-auto w-full"
          />
        </div>
      </section>
      <section id="services" className="w-full">
        <h2 className="mb-4 mt-4 text-[48px] font-medium text-red-1">
          Services.
        </h2>
        <div className="flex flex-col gap-4 text-xs">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis deleniti id fugit quae unde quod natus! Exercitationem
            excepturi, fugiat quidem minima, neque, nostrum iure beatae commodi
            dicta quasi ad accusantium!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis deleniti id fugit quae unde quod natus! Exercitationem
            excepturi, fugiat quidem minima, neque, nostrum iure beatae commodi
            dicta quasi ad accusantium!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis deleniti id fugit quae unde quod natus! Exercitationem
            excepturi, fugiat quidem minima, neque, nostrum iure beatae commodi
            dicta quasi ad accusantium!
          </p>
        </div>
      </section>
      <section id="contact" className="w-full">
        <h2 className="mb-4 mt-4 text-[48px] font-medium text-red-1">
          Contact.
        </h2>
        <div className="contact-form flex flex-col gap-2 text-xs">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="w-1/6">Name</div>
            <input
              className="flex-grow border border-gray-300 p-2"
              type="text"
              name="name"
              id=""
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="w-1/6">Email</div>
            <input
              type="text"
              className="flex-grow border border-gray-300 p-2"
              name="email"
              id=""
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="w-1/6">Message</div>
            <input
              type="text"
              className="flex-grow border border-gray-300 p-2"
              name="message"
              id=""
            />
          </div>
          <input
            type="button"
            value="Send Message"
            className="bg-red-1 p-2 text-white"
          />
        </div>
      </section>
    </div>
  );
}
