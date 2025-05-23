import { ArrowLeft, Mail, MapPin, Phone, Send } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1000);
  };
  return (
    <div>
      <div className="bg-slate-50  py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-slate-900  sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Fill out
              the form below or reach out directly.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white  rounded-lg shadow-sm border border-slate-200  p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900  mb-6">
                Send us a message
              </h2>

              {formStatus === "success" ? (
                <div className="bg-green-50  border border-green-200  rounded-md p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800 ">
                        Message sent successfully
                      </h3>
                      <div className="mt-2 text-sm text-green-700 ">
                        <p>
                          Thank you for reaching out! We'll get back to you as
                          soon as possible.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700  mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${
                        errors.name ? "border-red-500 " : "border-slate-200 "
                      } px-3 py-2 text-sm text-slate-900  bg-white  focus:outline-none focus:ring-1 focus:ring-[#2c4e85] `}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 ">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700  mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${
                        errors.email ? "border-red-500 " : "border-slate-200 "
                      } px-3 py-2 text-slate-900 text-sm  bg-white  focus:outline-none focus:ring-1 focus:ring-[#2c4e85] `}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 ">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-slate-700  mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${
                        errors.subject ? "border-red-500 " : "border-slate-200 "
                      } px-3 py-2 text-slate-900 text-sm bg-white  focus:outline-none focus:ring-1 focus:ring-[#2c4e85] `}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 ">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700  mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full rounded-md border ${
                        errors.message ? "border-red-500 " : "border-slate-200 "
                      } px-3 py-2 text-slate-900 text-sm  bg-white  focus:outline-none focus:ring-1 focus:ring-[#2c4e85] `}
                      placeholder="Your message here..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 ">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2c4e85] hover:bg-[#254170]   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85] dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-white  rounded-lg shadow-sm border border-slate-200  p-6 md:p-8 mb-8">
                <h2 className="text-xl font-bold text-slate-900  mb-6">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-[#2c4e85] dark:text-[#5a81bc]" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-900 ">
                        Email
                      </p>
                      <a
                        href="mailto:support@jobtracker.com"
                        className="text-sm text-slate-500  hover:text-[#2c4e85] dark:hover:text-[#5a81bc]"
                      >
                        support@jobtracker.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-[#2c4e85] dark:text-[#5a81bc]" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-900 ">
                        Phone
                      </p>
                      <a
                        href="tel:+1-555-123-4567"
                        className="text-sm text-slate-500  hover:text-[#2c4e85] dark:hover:text-[#5a81bc]"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[#2c4e85] dark:text-[#5a81bc]" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-900 ">
                        Address
                      </p>
                      <p className="text-sm text-slate-500 ">
                        123 Job Street, Suite 456
                        <br />
                        San Francisco, CA 94107
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white  rounded-lg shadow-sm border border-slate-200  p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900  mb-6">
                  Office Hours
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500 ">
                      Monday - Friday
                    </span>
                    <span className="text-sm font-medium text-slate-900 ">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500 ">Saturday</span>
                    <span className="text-sm font-medium text-slate-900 ">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500 ">Sunday</span>
                    <span className="text-sm font-medium text-slate-900 ">
                      Closed
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 ">
                  <p className="text-sm text-slate-500 ">
                    Need urgent assistance? Our support team is available 24/7
                    via email.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 ">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-slate-500 ">
                Find quick answers to common questions about JobTracker.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white  rounded-lg shadow-sm border border-slate-200  p-6">
                <h3 className="text-lg font-medium text-slate-900  mb-2">
                  How do I reset my password?
                </h3>
                <p className="text-slate-500 ">
                  You can reset your password by clicking on the "Forgot
                  password?" link on the login page. We'll send you an email
                  with instructions to reset your password.
                </p>
              </div>

              <div className="bg-white  rounded-lg shadow-sm border border-slate-200  p-6">
                <h3 className="text-lg font-medium text-slate-900  mb-2">
                  Is JobTracker free to use?
                </h3>
                <p className="text-slate-500 ">
                  JobTracker offers a free basic plan with limited features. We
                  also offer premium plans with additional features for power
                  users.
                </p>
              </div>

              <div className="bg-white  rounded-lg shadow-sm border border-slate-200  p-6">
                <h3 className="text-lg font-medium text-slate-900  mb-2">
                  Can I export my job application data?
                </h3>
                <p className="text-slate-500 ">
                  Yes, premium users can export their job application data in
                  CSV or PDF format from the dashboard settings.
                </p>
              </div>

              <div className="bg-white  rounded-lg shadow-sm border border-slate-200  p-6">
                <h3 className="text-lg font-medium text-slate-900  mb-2">
                  How secure is my data?
                </h3>
                <p className="text-slate-500 ">
                  We take data security seriously. All data is encrypted in
                  transit and at rest, and we never share your information with
                  third parties.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-500 ">
                Still have questions?{" "}
                <a
                  href="mailto:support@jobtracker.com"
                  className="text-[#2c4e85] dark:text-[#5a81bc] hover:underline"
                >
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <div className="bg-slate-50  py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center text-[#2c4e85]  hover:text-[#254170] "
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
