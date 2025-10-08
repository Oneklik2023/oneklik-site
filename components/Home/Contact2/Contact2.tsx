"use client";
import React, { useState } from "react";

export default function ContactForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://cms.oneklik.pl/wp-json/fluentform/v2/forms/1/submit", // 👈 zmień 1 na swoje ID
        {
          method: "POST",
          body: new FormData(e.currentTarget),
        }
      );

      const data = await res.json();
      if (data.errors) {
        setMessage("Błąd: " + JSON.stringify(data.errors));
      } else {
        setMessage("Wiadomość wysłana poprawnie!");
      }
    } catch (error) {
      setMessage("Wystąpił błąd. Spróbuj ponownie później.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-[#0F224C] rounded-md text-white"
    >
      <input
        type="text"
        name="names[first_name]" // 👈 dokładnie tak, jak Fluent Forms oczekuje
        placeholder="Imię"
        required
        className="bg-[#6A7282] p-2 rounded-md"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="bg-[#6A7282] p-2 rounded-md"
      />

      <textarea
        name="message"
        placeholder="Twoja wiadomość"
        rows={4}
        required
        className="bg-[#6A7282] p-2 rounded-md"
      />

      <button
        type="submit"
        className="bg-[#FC9700] hover:bg-[#e68a00] py-2 px-4 rounded-md font-semibold"
      >
        Wyślij
      </button>

      {message && (
        <p className="mt-2 text-sm text-green-400 font-semibold">{message}</p>
      )}
    </form>
  );
}
