import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API_URL from "../../config/api";

type WhatIBringItem = {
  title: string;
  description: string;
  icon: string;
};

type AboutData = {
  sectionLabel: string;
  title: string;
  mainHeading: string;
  paragraphs: string[];
  techStackLabel: string;
  techStack: string[];
  ctaText: string;
  ctaLink: string;
  whatIBringTitle: string;
  whatIBringSubtitle: string;
  whatIBring: WhatIBringItem[];
};



const emptyAbout: AboutData = {
  sectionLabel: "",
  title: "",
  mainHeading: "",
  paragraphs: ["", "", ""],
  techStackLabel: "",
  techStack: [],
  ctaText: "",
  ctaLink: "",
  whatIBringTitle: "",
  whatIBringSubtitle: "",
  whatIBring: [],
};

const AdminAbout = () => {
  const [about, setAbout] = useState<AboutData>(emptyAbout);
  const [newTechnology, setNewTechnology] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin";
      return;
    }

    const fetchAbout = async () => {
      try {
        const response = await fetch(`${API_URL}/about`);

        if (!response.ok) {
          throw new Error("Failed to load about content");
        }

        const data = await response.json();

        setAbout({
          sectionLabel: data.sectionLabel || "",
          title: data.title || "",
          mainHeading: data.mainHeading || "",
          paragraphs: data.paragraphs || ["", "", ""],
          techStackLabel: data.techStackLabel || "",
          techStack: data.techStack || [],
          ctaText: data.ctaText || "",
          ctaLink: data.ctaLink || "",
          whatIBringTitle: data.whatIBringTitle || "",
          whatIBringSubtitle: data.whatIBringSubtitle || "",
          whatIBring: data.whatIBring || [],
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load About content");
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, [token]);

  const updateField = (
    field: keyof AboutData,
    value: string,
  ) => {
    setAbout((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateParagraph = (
    index: number,
    value: string,
  ) => {
    setAbout((current) => {
      const paragraphs = [...current.paragraphs];

      paragraphs[index] = value;

      return {
        ...current,
        paragraphs,
      };
    });
  };

  const addTechnology = () => {
    const technology = newTechnology.trim();

    if (!technology) {
      return;
    }

    if (
      about.techStack.some(
        (item) =>
          item.toLowerCase() === technology.toLowerCase(),
      )
    ) {
      toast.info("Technology already exists");
      return;
    }

    setAbout((current) => ({
      ...current,
      techStack: [...current.techStack, technology],
    }));

    setNewTechnology("");
  };

  const removeTechnology = (index: number) => {
    setAbout((current) => ({
      ...current,
      techStack: current.techStack.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  const updateWhatIBring = (
    index: number,
    field: keyof WhatIBringItem,
    value: string,
  ) => {
    setAbout((current) => {
      const items = [...current.whatIBring];

      items[index] = {
        ...items[index],
        [field]: value,
      };

      return {
        ...current,
        whatIBring: items,
      };
    });
  };

  const addWhatIBring = () => {
    setAbout((current) => ({
      ...current,
      whatIBring: [
        ...current.whatIBring,
        {
          title: "",
          description: "",
          icon: "FiCode",
        },
      ],
    }));
  };

  const removeWhatIBring = (index: number) => {
    setAbout((current) => ({
      ...current,
      whatIBring: current.whatIBring.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  const handleSave = async () => {
    if (!token) {
      toast.error("Please login again");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/about`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(about),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update About content",
        );
      }

      setAbout(data.about);

      toast.success("About content updated successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update About content",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] text-gray-400">
        Loading About content...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/admin/dashboard"
            className="mb-4 inline-block text-sm text-gray-500 transition hover:text-white"
          >
            ← Back to Dashboard
          </a>

          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Manage About
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update the content displayed in your public About
            section.
          </p>
        </div>

        <div className="space-y-6">
          {/* Main About */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 className="text-lg font-semibold">
              Main About Content
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Section Label
                </label>

                <input
                  value={about.sectionLabel}
                  onChange={(event) =>
                    updateField(
                      "sectionLabel",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                  placeholder="About me"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Section Title
                </label>

                <input
                  value={about.title}
                  onChange={(event) =>
                    updateField(
                      "title",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                  placeholder="More than just code."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Main Heading
                </label>

                <textarea
                  value={about.mainHeading}
                  onChange={(event) =>
                    updateField(
                      "mainHeading",
                      event.target.value,
                    )
                  }
                  rows={3}
                  className="admin-input resize-none"
                  placeholder="I build modern web experiences..."
                />
              </div>

              {/* Paragraphs */}
              <div>
                <label className="mb-3 block text-sm text-gray-400">
                  About Paragraphs
                </label>

                <div className="space-y-3">
                  {about.paragraphs.map(
                    (paragraph, index) => (
                      <textarea
                        key={index}
                        value={paragraph}
                        onChange={(event) =>
                          updateParagraph(
                            index,
                            event.target.value,
                          )
                        }
                        rows={4}
                        className="admin-input resize-none"
                        placeholder={`Paragraph ${index + 1}`}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 className="text-lg font-semibold">
              Technology Stack
            </h2>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-gray-400">
                Stack Label
              </label>

              <input
                value={about.techStackLabel}
                onChange={(event) =>
                  updateField(
                    "techStackLabel",
                    event.target.value,
                  )
                }
                className="admin-input"
                placeholder="Technologies I work with"
              />
            </div>

            <div className="mt-5 flex gap-2">
              <input
                value={newTechnology}
                onChange={(event) =>
                  setNewTechnology(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTechnology();
                  }
                }}
                className="admin-input"
                placeholder="Add technology"
              />

              <button
                type="button"
                onClick={addTechnology}
                className="shrink-0 rounded-xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Add
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {about.techStack.map(
                (technology, index) => (
                  <div
                    key={`${technology}-${index}`}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300"
                  >
                    <span>{technology}</span>

                    <button
                      type="button"
                      onClick={() =>
                        removeTechnology(index)
                      }
                      className="text-gray-500 transition hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                ),
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 className="text-lg font-semibold">
              Call To Action
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Button Text
                </label>

                <input
                  value={about.ctaText}
                  onChange={(event) =>
                    updateField(
                      "ctaText",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                  placeholder="Let's work together"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Button Link
                </label>

                <input
                  value={about.ctaLink}
                  onChange={(event) =>
                    updateField(
                      "ctaLink",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                  placeholder="#contact"
                />
              </div>
            </div>
          </section>

          {/* What I Bring */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  What I Bring
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage the cards shown on the right side of
                  the About section.
                </p>
              </div>

              <button
                type="button"
                onClick={addWhatIBring}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
              >
                + Add Item
              </button>
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Heading
                </label>

                <input
                  value={about.whatIBringTitle}
                  onChange={(event) =>
                    updateField(
                      "whatIBringTitle",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                  placeholder="What I bring"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Subtitle
                </label>

                <input
                  value={about.whatIBringSubtitle}
                  onChange={(event) =>
                    updateField(
                      "whatIBringSubtitle",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                  placeholder="From idea to working product"
                />
              </div>

              {about.whatIBring.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-300">
                      Item {index + 1}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        removeWhatIBring(index)
                      }
                      className="text-xs text-gray-500 transition hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs text-gray-500">
                        Title
                      </label>

                      <input
                        value={item.title}
                        onChange={(event) =>
                          updateWhatIBring(
                            index,
                            "title",
                            event.target.value,
                          )
                        }
                        className="admin-input"
                        placeholder="Modern Frontend"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-gray-500">
                        Description
                      </label>

                      <textarea
                        value={item.description}
                        onChange={(event) =>
                          updateWhatIBring(
                            index,
                            "description",
                            event.target.value,
                          )
                        }
                        rows={3}
                        className="admin-input resize-none"
                        placeholder="Responsive interfaces with React..."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-gray-500">
                        Icon
                      </label>

                      <select
                        value={item.icon}
                        onChange={(event) =>
                          updateWhatIBring(
                            index,
                            "icon",
                            event.target.value,
                          )
                        }
                        className="admin-input"
                      >
                        <option value="FiCode">
                          Code
                        </option>

                        <option value="FiLayers">
                          Layers
                        </option>

                        <option value="FiDatabase">
                          Database
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Save */}
          <div className="flex justify-end pb-10">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;