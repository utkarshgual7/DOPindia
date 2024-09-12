import * as React from "react";

function IntroText() {
  return (
    <section className="flex flex-col ml-5 w-[55%] text-gray-800 max-md:ml-0 max-md:w-full">
      <p className="mt-8 text-lg leading-relaxed max-md:mt-6 max-md:text-base">
        Access a variety of services, including:
        <br />
        <strong>Book Mails:</strong> Easily send letters, parcels, and documents
        within India. Manage your mail and view your transaction history in one
        place.
        <br />
        <strong>Business Solutions:</strong> Take advantage of our business
        mailing services. Book bulk mail, request pickups, manage your account,
        and track delivery status seamlessly.
      </p>
    </section>
  );
}

export default IntroText;
