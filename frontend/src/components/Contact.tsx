import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import {
  type ContactData,
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
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
    <section id="contact" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
            Get In Touch
          </p>

          <h2 className="text-4xl font-bold sm:text-5xl">
            Let's{" "}
            <span className="gradient-text">Connect</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Have a project idea or want to work together? Send me a
            message.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 p-7 lg:col-span-2"
          >
            <h3 className="text-2xl font-bold">
              Contact Information
            </h3>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <FaEnvelope className="mt-1 text-xl" />

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="mt-1">
                    mehedi.hasan.bd.dev@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaWhatsapp className="mt-1 text-xl" />

                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <p className="mt-1">01877168787</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 h-5 w-5 rounded-full border border-white/30" />

                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="mt-1">Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              <a
                href="https://github.com/mehedilabs"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 p-3 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/mehedilabs/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 p-3 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://wa.me/8801877168787"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 p-3 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <FaWhatsapp />
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-7 lg:col-span-3"
          >
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-white/30"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-white/30"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-white/30"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={7}
                className="resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-white/30"
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;