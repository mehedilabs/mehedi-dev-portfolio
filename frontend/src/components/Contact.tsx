import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { toast } from "react-toastify";

import {
  sendContactMessage,
  type ContactData,
} from "../services/contactService";

const Contact = () => {
  const [formData, setFormData] = useState<ContactData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setIsSending(true);

    try {
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
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[150px]" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em]  text-cyan-400/80">
            Get in touch
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Let's Work{" "}
            <span className="gradient-text">Together</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500">
            Have a project, idea or opportunity? Feel free to send
            me a message.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <h3 className="text-xl font-bold text-white">
                Let's connect
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                I'm always open to discussing new projects,
                opportunities and ideas.
              </p>

              <div className="mt-7 space-y-4">
                <a
                  href="mailto:mehedi.hasan.bd.dev@gmail.com"
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition duration-300 hover:bg-white/[0.06]"
                >
                  <span className="rounded-lg bg-white/5 p-2.5 text-gray-300">
                    <FiMail />
                  </span>

                  <div>
                    <p className="text-xs text-gray-600">
                      Email
                    </p>

                    <p className="mt-1 text-sm text-gray-300">
                      mehedi.hasan.bd.dev@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:01877168787"
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition duration-300 hover:bg-white/[0.06]"
                >
                  <span className="rounded-lg bg-white/5 p-2.5 text-gray-300">
                    <FiPhone />
                  </span>

                  <div>
                    <p className="text-xs text-gray-600">
                      Phone
                    </p>

                    <p className="mt-1 text-sm text-gray-300">
                      01877168787
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <span className="rounded-lg bg-white/5 p-2.5 text-gray-300">
                    <FiMapPin />
                  </span>

                  <div>
                    <p className="text-xs text-gray-600">
                      Location
                    </p>

                    <p className="mt-1 text-sm text-gray-300">
                      Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/mehedilabs"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div>
                <p className="text-xs text-gray-600">
                  Find me on GitHub
                </p>

                <p className="mt-1 text-sm font-medium text-gray-300">
                  github.com/mehedilabs
                </p>
              </div>

              <FiArrowUpRight className="text-gray-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-medium text-gray-400"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-white/25"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium text-gray-400"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-white/25"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="subject"
                className="mb-2 block text-xs font-medium text-gray-400"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                required
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-white/25"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-medium text-gray-400"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                rows={7}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-white/25"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send Message"}

              <FiSend className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;