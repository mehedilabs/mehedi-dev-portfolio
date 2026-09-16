const API_URL =
  "https://mehedi-dev-portfolio-d3ql.vercel.app/api/contact";

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactMessage = async (contactData: ContactData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};