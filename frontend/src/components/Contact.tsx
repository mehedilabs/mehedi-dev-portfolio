import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import {
  ContactData,
  sendContactMessage,
} from "../services/contactService";

const Contact = () => {
  const [formData, setFormData] = useState<ContactData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await sendContactMessage(formData);

      toast.success("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-black px-4 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-400">
            Get In Touch
          </p>

          <h2 className="text-4xl font-bold md:text-5xl">
            Let's{" "}
            <span className="gradient-text">Connect</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Have a project idea or want to work together? Send me a
            message.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-6 text-2xl font-semibold">
              Contact Information
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-xl" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p>{`mehedi.hasan.bd.dev@gmail.com`}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaWhatsapp className="text-xl" />
                <div>
                  <p className="text-sm text-gray-400">WhatsApp</p>
                  <p>01877168787</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p>Bangladesh</p>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="https://github.com/mehedilabs"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 p-3 transition hover:bg-white/10"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/mehedilabs/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 p-3 transition hover:bg-white/10"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://wa.me/8801877168787"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 p-3 transition hover:bg-white/10"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="grid gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-white/30"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-white/30"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-white/30"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full resize-none rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-white/30"
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;